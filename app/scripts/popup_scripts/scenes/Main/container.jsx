import { ExtensionManager } from '../../../managers/ExtensionManager';
import { MainPresentational } from './presentational';
import PropTypes from 'prop-types';
import React from 'react';
import { SiteParser } from '../../utils/SiteParser';
import { getCleanDomain } from '../../../util/domain';
import { withTranslation } from '../../intl';

/**
 * @typedef {object} Props
 * @prop {import('../../intl').t} t
 *
 * @extends {React.Component<Props>}
 */

class MainContainer extends React.Component {
  /**
   * @param {Props} props
   */
  constructor(props) {
    super(props);

    this.extensionManager = new ExtensionManager();

    this.state = {
      /**
       * @type {boolean} information about plugin state
       */
      isEnabled: true,
      /**
       * @type {boolean}
       */
      isReportingSite: false,
      /**
       * @type {boolean}
       */
      loading: true,
      /**
       * @type {boolean}
       */
      siteHasBeenReported: false,
      /**
       * @type {import('../../../entities').Site|null}
       */
      site: null,
    };

    this.onReportButtonClick = this.onReportButtonClick.bind(this);
    this.onEnableChange = this.onEnableChange.bind(this);
  }

  async componentDidMount() {
    const tabs = await browser.tabs.query({ currentWindow: true, active: true });

    const site = new SiteParser().parse({
      json: await browser.runtime.sendMessage({ type: 'getSite', tab: tabs[0] }),
    });

    const isEnabled = await this.extensionManager.isExtensionEnabled();

    this.setState({ isEnabled, loading: false, site });
  }

  render() {
    return (
      <MainPresentational
        {...this.state}
        {...this.props}
        onExtensionActivationChange={this.onEnableChange}
        onReportingSiteClick={this.onReportButtonClick}
      />
    );
  }

  async onReportButtonClick() {
    const { site } = this.state;

    if (!site) {
      return;
    }

    const url = site.getUrl();

    const endpointUrl = `${process.env.APP_HOST}/addNonCompliantSite`;
    const domain_name = getCleanDomain({ url });
    const payload = { domain_name, url };

    this.setState({ isReportingSite: true });

    await fetch(endpointUrl, {
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' },
      method: 'post',
    });

    this.setState({ isReportingSite: false, siteHasBeenReported: true });
  }

  /**
   * @param {React.ChangeEvent<HTMLInputElement>} event
   */
  async onEnableChange(event) {
    const { checked } = event.currentTarget;

    await this.extensionManager.setStatusTo(checked);

    const {
      0: { id },
    } = await browser.tabs.query({ active: true, currentWindow: true });

    browser.tabs.reload(id, { bypassCache: true });
    browser.runtime.reload(); // This reloads the backgroud.js which is not reloaded with a simple Ctrl+R
  }
}

MainContainer.propTypes = {
  t: PropTypes.func.isRequired,
};

export const Main = withTranslation(MainContainer);

import { ExtensionManager } from '../../../managers/ExtensionManager';
import { MainPresentational } from './presentational';
import PropTypes from 'prop-types';
import React from 'react';
import { SiteParser } from '../../utils/SiteParser';
import { withTranslation } from '../../intl';

class MainContainer extends React.Component {
  constructor(props) {
    super(props);

    this.extensionManager = new ExtensionManager();

    this.state = {
      isEnabled: true,
      loading: true,
      site: null,
    };

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
    return <MainPresentational {...this.state} {...this.props} onExtensionActivationChange={this.onEnableChange} />;
  }

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

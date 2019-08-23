import { Site } from '../entities';

declare global {
  export type Repository = {
    [index: number]: Site | null;
  };

  export interface Observer {
    on(event: string): void;
  }

  export type Rules = {
    cssPropertiesBased: string[];
    domainBased: { [key: string]: string };
  };

  /**
   * Only for tests
   */
  namespace NodeJS {
    interface Global {
      browser?: any;
    }
  }
}

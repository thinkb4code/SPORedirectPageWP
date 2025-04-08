import * as React from 'react';
import type { IRedirectWebPartProps } from './IRedirectWebPartProps';

export default class RedirectWebPart extends React.Component<IRedirectWebPartProps, {}> {
  public render(): React.ReactElement<IRedirectWebPartProps> {
    return (
      <div>You will be automatically redirected to VillageWeb search result page.</div>
    );
  }
}

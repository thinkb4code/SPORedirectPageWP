import * as React from 'react';
import type { IRedirectWebPartProps } from './IRedirectWebPartProps';

export default class RedirectWebPart extends React.Component<IRedirectWebPartProps, {}> {
  public render(): React.ReactElement<IRedirectWebPartProps> {
    return (
      <div>Please use the webpart edit property pane to configure the webpart.</div>
    );
  }
}

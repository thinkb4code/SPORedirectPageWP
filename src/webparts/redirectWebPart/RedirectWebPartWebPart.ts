import * as React from 'react';
import * as ReactDom from 'react-dom';
import { DisplayMode, Version } from '@microsoft/sp-core-library';
import {
	type IPropertyPaneConfiguration,
	PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'RedirectWebPartWebPartStrings';
import RedirectWebPart from './components/RedirectWebPart';
import { IRedirectWebPartProps } from './components/IRedirectWebPartProps';
import { PropertyFieldMultiSelect } from '@pnp/spfx-property-controls';

export interface IRedirectWebPartWebPartProps {
	RedirectSite: string;
	QueryStringSelected: string[];
}

export default class RedirectWebPartWebPart extends BaseClientSideWebPart<IRedirectWebPartWebPartProps> {
	private QueryStrings: string[] = [];
	private Redirect: boolean = true;
	private urlParams: URLSearchParams;

	public render(): void {
		if(!this.Redirect || this.displayMode === DisplayMode.Edit) {
			const element: React.ReactElement<IRedirectWebPartProps> = React.createElement(
				RedirectWebPart,
				{
				}
			);
	
			ReactDom.render(element, this.domElement);
		}else {
			const selectedValues: {Key: string; Value: string;}[] = [];
			this.urlParams.forEach((value, key) => {
				if(this.properties.QueryStringSelected.indexOf(key) >= 0) {
					selectedValues.push({Key: key, Value: value});
				}
			});
			window.open(`${this.properties.RedirectSite}?${selectedValues.map(m => `${m.Key}=${m.Value}`).join('&')}`, "_self");
		}
	}

	protected onInit(): Promise<void> {
		this.urlParams = new URLSearchParams(window.location.search);
		this.urlParams.forEach((value: string, key: string) => {
			if (key.toLocaleLowerCase() === 'stop') {
				this.Redirect = false;
			}

			this.QueryStrings.push(key); // Push each key into the array
		});

		return Promise.resolve();
	}

	protected onDispose(): void {
		ReactDom.unmountComponentAtNode(this.domElement);
	}

	protected get dataVersion(): Version {
		return Version.parse('1.0');
	}

	protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
		const SelectQueryString = this.QueryStrings.length > 0 ? PropertyFieldMultiSelect('QueryStringSelected', {
			key: 'multiSelect',
			label: 'Select Query Strings',
			options: this.QueryStrings.map(m => ({key: m, text: m})),
			selectedKeys: this.properties.QueryStringSelected.length > 0 ? this.properties.QueryStringSelected : []
		}) : PropertyPaneTextField('QueryStringSelected', {
			label: 'Query String',
			description: 'Comma separated query string parameter keys.',
			disabled: true,
			value: `No Query Parameter available to configure.`
		});

		return {
			pages: [
				{
					header: {
						description: strings.PropertyPaneDescription
					},
					groups: [
						{
							groupName: strings.BasicGroupName,
							groupFields: [
								PropertyPaneTextField('RedirectSite', {
									label: strings.RedirectFieldDesc,
									description: `URL where this page will redirect. E.g. https://abc.sharepoint.com/sites/search/SitePages/Results.aspx`
								}),
								SelectQueryString,
								PropertyPaneTextField('StopRedirectKey', {
									label: `Stop Redirect Key`,
									description: `URL Query String parameter that will be used to stop redirect. By defult, 'Stop' key will be used to prevent redirection. For example if value is set to 'noredirect' the URL format /SitePages/Results.aspx?noredirect=1 should be in use to prevent redirect.`
								})
							]
						}
					]
				}
			]
		};
	}
}

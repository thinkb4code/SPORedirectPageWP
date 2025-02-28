declare interface IRedirectWebPartWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  RedirectFieldDesc: string;
  AppLocalEnvironmentSharePoint: string;
  AppLocalEnvironmentTeams: string;
  AppLocalEnvironmentOffice: string;
  AppLocalEnvironmentOutlook: string;
  AppSharePointEnvironment: string;
  AppTeamsTabEnvironment: string;
  AppOfficeEnvironment: string;
  AppOutlookEnvironment: string;
  UnknownEnvironment: string;
}

declare module 'RedirectWebPartWebPartStrings' {
  const strings: IRedirectWebPartWebPartStrings;
  export = strings;
}

export const Config = { 
	redirectUrl: 'http://localhost:3000/auth', 
	clientId: '--PUT YOUR CLIENT CODE HERE--',
	authUrl: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
	scopes: 'user.read,contacts.readwrite,files.readwrite,offline_access',
	graphUrl: 'https://graph.microsoft.com/v1.0',
	excelFilePath: 'https://graph.microsoft.com/v1.0/me/drive/root:/GraphExcelSample001.xlsx:/'
}
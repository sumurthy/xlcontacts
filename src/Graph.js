import {Config} from './config'
var self = module.exports = {

    getContacts: async (token='') => {
        let headers = new Headers()
        headers.append('Accept', 'application/json')
        headers.append('Authorization', token)
        let response
        try {
          response = await fetch(`${Config.graphUrl}/me/contacts?$select=displayname,businessphones,businessaddress,emailaddresses`, {
                headers: headers
          })
          let body = await response.json()
          if (response.ok) {
            return self.processContacts(body)
          } else {
            throw new Error('Error processing contacts.')
          }
        } catch (e) {
            throw new Error('Error getting contacts. HTTP: ' + response.status)
        } finally {
        }
    },

    processContacts: (list={}) => {
        //let contacts = JSON.parse(list)
        let contact =  []
        let contacts = []
        list.value.forEach((e) => {
            contact.push(e.displayName)
            contact.push(e.emailAddresses[0].address)
            contact.push(e.businessPhones[0])
            contact.push(e.businessAddress.city)
            contact.push(e.businessAddress.state)
            contacts.push(contact)
            contact = []
        })
        return contacts
    },

    checkFile: async (token='') => {
      let headers = new Headers()
      headers.append('Accept', 'application/json')
      headers.append('Authorization', token)
      let response
      try {
        response = await fetch(Config.excelFilePath, {
            headers: headers
        })
        if (response.ok) {
          return true
        }
        else if (response.status === 404) {
          await self.createEmptyExcel(token)
          return true
        }
        else {
          return false
        }
      } catch (e) {
          return false
      } finally {
      }
    },

    createEmptyExcel: async (token='') => {
      let blankXlsxFileBase64Content = "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"
      // var url = "data:image/png;base64," + blankXlsxFileBase64Content
      let url = "data:application/octet-stream;base64," + blankXlsxFileBase64Content
      let blob
      try {
        let response = await fetch(url)
        blob = await response.blob()
      } catch (e) {
        throw new Error('Error in creating empty Excel file blob data.')
      }
      let headers = new Headers()
      headers.append('Content-Type', 'application/octet-stream')
      headers.append('Authorization', token)
      try {
        let response = await fetch(`${Config.excelFilePath}/content`, {
        method: 'PUT',
        headers: headers,
        body: blob
        })
        return
      } catch (e) {
          throw new Error('Error creating empty file.')
      }    
    },

    loadContactInExcle: async (token = '', contacts = null) => {
      let headers = new Headers()
      headers.append('Accept', 'application/json')
      headers.append('Authorization', token)
      let body = {} //New worksheet with default name
      let response = null
      try {
        // Step-1: Create an Excel persistent session 
        body = {
          persistChanges: true 
        }        
        response = await fetch(`${Config.excelFilePath}/workbook/createSession`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body)
        })
        if (!response.ok) { throw new Error('Create session failed. ') }

        let session = await response.json()
        // Load the session id as part of the headers. 
        headers.append('Workbook-Session-Id', session.id)

        // Step-2: Create a new worksheet
        response = await fetch(`${Config.excelFilePath}/workbook/worksheets`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body)
        })

        if (!response.ok) { throw new Error('Create workseet failed. ') }

        let ws = await response.json()
        
        // Step-3: Create a new table

        body = {
          address: `${ws.name}!A1:E1`, 
          hasHeaders: true
        }

        response = await fetch(`${Config.excelFilePath}/workbook/worksheets/${ws.name}/tables/add`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body)
        })

        if (!response.ok) { throw new Error('Create table failed. ') }

        let table = await response.json()

        // Step-4: Add rows at the end of the table.

        body = {
          index: -1,
          values: contacts
        }

        response = await fetch(`${Config.excelFilePath}/workbook/worksheets/${ws.name}/tables/${table.name}/rows`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body)
        })

        if (!response.ok) { throw new Error('Add rows to Excel table failed. ') }


      } catch (e) {
        throw new Error("Error in creating Excel worksheet: " + e)
      }
    }
}


import {Config} from './config'

var self = module.exports = {

    getContacts: async (token="") => {
        let headers = new Headers()
        headers.append('Accept', 'application/json')
        headers.append('Authorization', token)
        let response = null
        try {
            return await fetch(`${Config.graphUrl}/me/contacts?$select=displayname,businessphones,businessaddress,emailaddresses`, {
                headers: headers
            })
        } catch (e) {
            console.log("Error");
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
    }

}
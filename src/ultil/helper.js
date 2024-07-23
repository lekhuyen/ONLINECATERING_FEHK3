export const validate = (payload, setInvalidFields) => {
    let invalid = 0

    const formatPayload = Object.entries(payload)

    for(let arr of formatPayload) {
        if(arr[1].trim() === '') {
            invalid++
            setInvalidFields(prev => [...prev, {name: arr[0], mes: 'Require this field'}])
        }
    }   

    for(let arr of formatPayload) {
        switch (arr[0]) {
            case 'userEmail':
                const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
                if(!arr[1].match(regex)) {
                    setInvalidFields(prev => [...prev, {name: arr[0], mes: 'Email invalid'}])
                }
                break;
                
            case 'password':
                if(arr[1].length < 6) {
                    invalid++
                    setInvalidFields(prev => [...prev, {name: arr[0], mes: 'Password minium 6 characters'}])
                }
                break;
                
            default:
                break;
        }
    }

    return invalid
}
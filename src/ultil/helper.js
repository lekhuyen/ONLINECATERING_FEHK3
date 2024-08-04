import { FaRegStarHalfStroke } from "react-icons/fa6"
import { MdOutlineStarPurple500, MdStarOutline } from "react-icons/md"

export const validate = (payload, setInvalidFields) => {
    let invalid = 0

    const formatPayload = Object.entries(payload)

    for(let arr of formatPayload) {
        if(arr[1].trim() === '') {
            invalid++
            setInvalidFields(prev => [...prev, {name: arr[0], mes: 'This field is required'}])
        }
    }   

    for(let arr of formatPayload) {
        switch (arr[0]) {
            case 'userEmail':
                const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
                if(!arr[1].match(regex)) {
                    setInvalidFields(prev => [...prev, {name: arr[0], mes: 'Invalid email'}])
                }
                break;
                
            case 'password':
                if(arr[1].length < 6) {
                    invalid++
                    setInvalidFields(prev => [...prev, {name: arr[0], mes: 'Password must be at least 6 characters'}])
                }
                break;
                
            default:
                break;
        }
    }

    return invalid
}

export const renderStarFromNumber = (number, size) => {
    if (!Number(number) && number !== 0) return;
    
    const stars = [];
    const fullStars = Math.floor(number);
    const hasHalfStar = number % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
        stars.push(<MdOutlineStarPurple500 key={`full-${i}`} color="orange" size={size || 30} />);
    }
    
    if (hasHalfStar) {
        stars.push(<FaRegStarHalfStroke key="half" color="orange" size={size || 30} />);
    }

    const emptyStars = 5 - stars.length;

    for (let i = 0; i < emptyStars; i++) {
        stars.push(<MdStarOutline key={`empty-${i}`} color="orange" size={size || 30} />);
    }
    
    return stars;
}
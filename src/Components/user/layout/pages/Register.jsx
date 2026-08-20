import { useEffect, useState } from "react"
export default function Login(){
const [name, setName] = useState('')
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [phonenumber, setPhoneNumber] = useState('')   
const [address, setAddress] = useState('')    
const [image, setImage] = useState('')  

    async function submitForm(e) {
        e.preventDefault()

        let payload = {
            name: Name,
            email: Email,
            password: Password,
            phonenumber:PhoneNumber,
            address:Address,
            Image:Image  
        }

        await Categoryservices.add(payload)

        alert("Register successfully!")
    }

        return(
        <>
 <div className="container-fluid Login py-5">
                <div className="container py-5">
                    <div className="p-5 bg-light rounded">

                        <div className="row g-5">
                            <div className="col-lg-12">

                                <form onSubmit={submitForm}>

                                    {/* Name */}
                                    <input
                                        type="text"
                                        className="w-100 form-control py-3 mb-3 border-primary"
                                        placeholder="Name"
                                        onChange={(e) => setName(e.target.value)}
                                    />

                                    {/* Email */}
                                    <input
                                        type="text"
                                        className="w-100 form-control py-3 mb-3 border-primary"
                                        placeholder="Email"
                                        onChange={(e) => setEmail(e.target.value)}
                                    />

                                     {/* Password */}
                                    <input
                                        type="text"
                                        className="w-100 form-control py-3 mb-3 border-primary"
                                        placeholder="Password"
                                        onChange={(e) => setPassword(e.target.value)}
                                    />

                                     {/* Phone no */}
                                    <input
                                        type="text"
                                        className="w-100 form-control py-3 mb-3 border-primary"
                                        placeholder="Phone number"
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                    /> 

                                    {/* Address */}
                                    <input
                                        type="text"
                                        className="w-100 form-control py-3 mb-3 border-primary"
                                        placeholder="Address"
                                        onChange={(e) => setAddress(e.target.value)}
                                    />
                                     {/* Image */}
                                    <input
                                        type="text"
                                        className="w-100 form-control py-3 mb-3 border-primary"
                                        placeholder="Image"
                                        onChange={(e) => setImage(e.target.value)}
                                    />

                                    {/* Submit */}
                                    <button
                                        className="w-100 btn btn-primary form-control py-3 border-primary text-white bg-primary"
                                        type="submit"
                                    >
                                        Submit
                                    </button>

                                </form>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
</>
)

}
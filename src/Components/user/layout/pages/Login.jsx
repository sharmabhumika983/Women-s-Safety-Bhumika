import { useEffect, useState } from "react"
export default function Login(){
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
   
    
    async function submitForm(e) {
        e.preventDefault()

        let payload = {
            email: Email,
            password: Password,
            
        }

        await Categoryservices.add(payload)

        alert("Login successfully!")
    }

        return(
        <>
 <div className="container-fluid Login py-5">
                <div className="container py-5">
                    <div className="p-5 bg-light rounded">

                        <div className="row g-5">
                            <div className="col-lg-12">

                                <form onSubmit={submitForm}>

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
import emailjs from "emailjs-com";
import React from "react";
import useAuth from "../../hooks/useAuth";
import "./EmailJS.css";

const EmailJS = (props) => {

    const [user, token] = useAuth();

    const templateParams = {
        subject: "Your date night itinerary inside",
        name: `${user.first_name}`,
        message: "pull current date night in here"
    };

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.send('service_xyg31q3', 'template_8wng7ul', templateParams, 'rNS8dDRzazPcQrmwr')  // youtube tutorial has e.target instead of form.current.  API key: 'rNS8dDRzazPcQrmwr'
          .then((result) => {
              console.log(result.text);
              console.log(`${user.first_name}`)
          }, (error) => {
              console.log(error.text);
          });
        //   e.target.reset()
    };

    // will need to filter for currentDateNight

    return ( 
        <div>
            <div className="container">
            <button className=" email-button" onClick={sendEmail}>Email Current Itinerary</button>
            {/* <form onSubmit={sendEmail}>
                <div className="row pt-5 mx-auto">
                    <div className="col-8 form-group mx-auto">
                        <input type="text" className="form-control" placeholder="Name" name="name"/>
                    </div>
                    <div className="col-8 form-group pt-2 mx-auto">
                        <input type="email" className="form-control" placeholder="Email Address" name="email"/>
                    </div>
                    <div className="col-8 form-group pt-2 mx-auto">
                        <input type="text" className="form-control" placeholder="Subject" name="subject" />
                    </div>
                    <div className="col-8 form-group pt-2 mx-auto">
                        <textarea className="form-control" id="" cols="30" rows="8" placeholder="Your message" name="message"></textarea>
                    </div>
                    <div className="col-8 pt-3 mx-auto">
                        <input type="submit" className="btn btn-info" value="Send Message"></input>
                    </div>
                </div>
            </form> */}
            </div>
        </div>
     );
}
 
export default EmailJS;
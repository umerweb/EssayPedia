import { Link } from "react-router-dom";

function VerifyMail() {

    

    
    const succes = async () => {
        try {
          // Get the current URL
          const currentUrl = window.location.href;
      
          // Parse the URL to extract the path
          const urlParts = currentUrl.split('/');
      
          // Extract the userId from the path
          const userId = urlParts[urlParts.length - 1];
      
          // Use the userId to fetch data
          const response = await fetch(`https://essaypedia.onrender.com/register/verify/${userId}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId: userId }) // Pass userId in the request body
          });
      
          // Check if the request was successful
          if (response.ok) {
            // Handle successful response
            const responseData = await response.json();
            console.log(responseData); // Log the response data
          } else {
            // Handle error response
            console.error('Error:', response.statusText);
          }
        } catch (error) {
          // Handle any other errors
          console.error('Error:', error.message);
        }
      };
      
      // Call the succes function
      succes();
      
    
    
 

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-green-600 mb-4">Email Verified!</h1>
        <p className="text-lg text-gray-700 mb-4">Your email has been successfully verified. You can now proceed to login.</p>
        <Link to={'/login'}><button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">Login</button></Link>
      </div>
    </div>
  );
}

export default VerifyMail;

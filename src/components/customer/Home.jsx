import React from "react";

const Home = () => {
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card bg-transparent border-0">
        <div className="card-body text-center">
          <h1 className="card-title display-4 fw-bold">Welcome to Bad Bank!</h1>
          <p className="card-text lead text-justify">
            Embark on a Journey to Transform Your Financial Future. Here at Bad
            Bank, we believe in empowering you to take control of your finances
            and achieve your dreams.
          </p>
          <p className="card-text text-justify">
            Whether you're saving for a new home, planning your dream vacation,
            or investing for a secure retirement, Bad Bank is your trusted
            partner on your financial journey.
          </p>
          <p className="card-text text-justify">
            Discover our user-friendly tools, personalized advice, and
            innovative solutions that will help you reach your financial goals
            faster and with confidence.
          </p>
        </div>
        <div className="d-flex justify-content-center align-items-center p-3">
          <img
            src="http://economyria.com/wp-content/uploads/2021/01/bad-bank.jpg" // Replace with actual image URL
            alt="Image 1"
            className="img-fluid rounded-circle mx-1"
            style={{ width: "80px", height: "80px" }}
          />
          <img
            src="https://im.rediff.com/news/2021/jan/bad-loans-o.jpg?w=670&h=900" // Replace with actual image URL
            alt="Image 2"
            className="img-fluid rounded-circle mx-1"
            style={{ width: "80px", height: "80px" }}
          />
          <img
            src="https://www.iasgyan.in//ig-uploads/images//image03615.jpg" // Replace with actual image URL
            alt="Image 3"
            className="img-fluid rounded-circle mx-1"
            style={{ width: "80px", height: "80px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;

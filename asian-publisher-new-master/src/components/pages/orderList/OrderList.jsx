import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { toastError } from "../../../util/reactToastify";
import CartHeaderImage from "../../../Images/CartHeaderImage.png";
import Spinner from "../../common/Spinner";
import UserHeader from "../../common/header/UserHeader";
function OrderList() {
  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.state;
  const [userOrder, setUserOrder] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    async function OrderList() {
      setLoader(true);
      try {
        const response = await axios.get(
          `https://api.asianpublisher.in/api/OrderApi/OrderListByUser`,
          {
            headers: {
              userId: userId,
            },
          }
        );
        if (response?.data?.message === "Success") {
          setUserOrder(response?.data?.orders);
        }
      } catch (error) {
        toastError(error?.response?.data?.message);
      }
      setLoader(false);
    }
    OrderList();
  }, [userId]);

  return (
    <>
      {loader && <Spinner />}
      <UserHeader />
      <div
        className="Headerrowabout"
        style={{
          backgroundImage: `url(${CartHeaderImage})`,
          "background-size": "cover",
          "background-position": "center",
          height: "40vh",
        }}
      >
        <div className="gradient-overlay" />
        <div className="col-lg-2" style={{ float: "left" }}>
          &nbsp;
        </div>
        <div className="col-lg-8" style={{ float: "left" }}>
          <div
            className="video-content"
            style={{
              "-webkit-text-align": "center",
              "text-align": "center",
              "padding-top": "120px",
            }}
          >
            <p
              className="text"
              style={{
                "-webkit-text-transform": "uppercase",
                "text-transform": "uppercase",
                "font-size": "40px",
                "font-weight": "600",
                "-webkit-text-shadow": "2px 2px 4px rgba(0, 0, 0, 0.5)",
                "text-shadow": "2px 2px 4px rgba(0, 0, 0, 0.5)",
              }}
            >
              Order List
            </p>
          </div>
        </div>
        <div className="col-lg-2" style={{ float: "left" }}>
          &nbsp;
        </div>
      </div>
      <br />
      <div
        className="row"
        id="AboutUsSection"
        style={{
          display: "block",
          margin: "0px",
          padding: "0px",
          clear: "both",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-6">
              <table className="table table-spriped">
                <tbody>
                  <tr>
                    <th style={{ "font-size": "18px", width: "20%" }}>Name</th>

                    <th style={{ "font-size": "18px" }}>Mobile No.</th>
                    <th style={{ "font-size": "18px" }}>Order Date</th>
                    <th style={{ "font-size": "18px" }}>Order Time</th>
                    <th
                      style={{
                        "-webkit-text-align": "right",
                        "text-align": "right",
                        "font-size": "18px",
                      }}
                    >
                      Status
                    </th>
                    <th
                      style={{
                        "font-size": "18px",
                        textAlign: "center",
                      }}
                    >
                      Action
                    </th>
                  </tr>
                  {userOrder &&
                    userOrder.length > 0 &&
                    userOrder.map((user, index) => (
                      <tr index={index}>
                        <td
                          style={{ "font-weight": "600", "font-size": "18px" }}
                        >
                          {user?.mobileNo}
                        </td>
                        <td
                          style={{ "font-weight": "600", "font-size": "18px" }}
                        >
                          {user?.mobileNo}
                        </td>
                        <td
                          style={{ "font-weight": "600", "font-size": "18px" }}
                        >
                          {user?.dateNew}
                        </td>
                        <td
                          style={{ "font-weight": "600", "font-size": "18px" }}
                        >
                          {user?.timeNew}
                        </td>
                        <td
                          style={{
                            "-webkit-text-align": "right",
                            "text-align": "right",
                          }}
                        >
                          {user?.status ? "Paid" : "Unpaid"}
                        </td>
                        <td>
                          <center>
                            <button
                              style={{
                                backgroundColor: "green",
                                color: "#fff",
                                border: "none",
                                padding: "7px 15px 7px 15px",
                              }}
                              onClick={() => {
                                navigate("/order-details", { state: user });
                              }}
                            >
                              View Details
                            </button>
                          </center>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div
        className="row"
        style={{
          boxShadow: "0px -5px 5px rgba(0, 0, 0, 0.2)",
          paddingTop: 10,
          width: "100vw",
          bottom: "0px",
          position: "absolute",
        }}
      >
        <center>
          <p style={{ textAlign: "center", width: "100vw" }}>
            Designed &amp; Developed By Innovate X
          </p>
        </center>
      </div>{" "}
    </>
  );
}

export default OrderList;

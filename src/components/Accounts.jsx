import axios from "axios";
import { Button, Modal } from "react-bootstrap";
import React, { Component } from "react";
import { LoginConsumer } from "../context/loginContext";

export default class Accounts extends Component {
  state = {
    accounts: [],
    show: false,
    name: "",
    email: "",
    pwd: "",
    phn: "",
    course: "",
    usn:"",
    id:""
  };

  componentDidMount() {
    axios
      .get("https://product-dd62a-default-rtdb.firebaseio.com/accounts.json")
      .then((resp) => {
        let fetchedAccounts = [];

        for (const key in resp.data) {
          fetchedAccounts.push({
            id: key,
            ...resp.data[key],
          });
        }
        console.log(fetchedAccounts);
        this.setState({
          accounts: fetchedAccounts,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleDelete = (account) => {
    axios
      .delete(
        `https://product-dd62a-default-rtdb.firebaseio.com/accounts/${account.id}.json`
      )
      .then((resp) => {
        console.log("deleted");

        const updatedAccounts = this.state.accounts.filter((acc) => {
          return acc.id !== account.id ? acc : null;
        });

        this.setState({
          accounts: updatedAccounts,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleClose = () => {
    this.setState({
      show: false,
    });
  };

  handleChage = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  updateRecord = (acc) => {
    const { name, email, course,usn, phn, pwd, id } = acc;
    this.setState({
      show: true,
      name: name,
      email: email,
      pwd: pwd,
      phn: phn,
      usn:usn,
      course: course,
      id:id
    });
  };

  updateAccount =()=>{
      const url = `https://product-dd62a-default-rtdb.firebaseio.com/accounts/${this.state.id}.json`
      const {name, email , pwd , phn , course,usn} = this.state
      const account = {
          name,
          pwd,
          email,
          phn,
          usn,
          course
      };

      axios.put(url , account).then((resp)=>{
          console.log(resp.status);
          
         const updated = this.state.accounts.map((acc)=>{
              return acc.id !== this.state.id ?acc : account 
          })

          this.setState({
            accounts:updated,
            show: false,
            name: "",
            email: "",
            pwd: "",
            phn: "",
            course: "",
            usn:"",
            id:""
          })
      }).catch((err)=>{
          console.log(err);

      })
  }
  render() {
    return (
        <LoginConsumer>

            {
                info =>{
                    if (info.login) {
                        return (
                            <div>
                            <h1>Accounts</h1>
                            <table className="table table-hover table-dark">
                              <thead>
                                <tr>
                                  <th scope="col">SI.NO</th>
                                  <th scope="col">Name</th>
                                  <th scope="col">USN</th>
                                  <th scope="col">Email</th>
                                  <th scope="col">Phone Number</th>
                                  <th scope="col">Course</th>
                                  <th scope="col"></th>
                                  <th scope="col"></th>
                                </tr>
                              </thead>
                              <tbody>
                                {this.state.accounts.map((data, index) => {
                                  return (
                                    <tr>
                                      <td>{index + 1}</td>
                                      <td>{data.name}</td>
                                       <td>{data.usn}</td>
                                      <td>{data.email}</td>
                                      <td>{data.phn}</td>
                                      <td>{data.course}</td>
                                      <Button
                                        className="btn-danger"
                                        onClick={() => {
                                          this.handleDelete(data);
                                        }}
                                      >
                                        Delete
                                      </Button>
                                      <Button
                                        className="btn-info"
                                        onClick={() => {
                                          this.updateRecord(data);
                                        }}
                                      >
                                        Update
                                      </Button>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                    
                            <Modal
                              show={this.state.show}
                              animation={false}
                              onHide={this.handleClose}
                            >
                              <Modal.Header>
                                <Modal.Title>Update Record</Modal.Title>
                              </Modal.Header>
                    
                              <Modal.Body>
                                <form className="container" onSubmit={this.handleSubmit}>
                                  <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      id="name"
                                      name="name"
                                      value={this.state.name}
                                      onChange={this.handleChage}
                                    />
                                  </div>
                                  <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Email address</label>
                                    <input
                                      type="email"
                                      className="form-control"
                                      id="exampleInputEmail1"
                                      aria-describedby="emailHelp"
                                      name="email"
                                      value={this.state.email}
                                      onChange={this.handleChage}
                                    />
                                  </div>
                                  <div className="form-group">
                                    <label htmlFor="exampleInputPassword1">Password</label>
                                    <input
                                      type="password"
                                      className="form-control"
                                      id="exampleInputPassword1"
                                      name="pwd"
                                      value={this.state.pwd}
                                      onChange={this.handleChage}
                                    />
                                  </div>
                    
                                  <div className="form-group">
                                    <label htmlFor="phone">Phone Number</label>
                                    <input
                                      type="number"
                                      className="form-control"
                                      id="phn"
                                      name="phn"
                                      value={this.state.phn}
                                      onChange={this.handleChage}
                                    />
                                  </div>
                                  <div className="form-group">
                                    <label htmlFor="course">Course</label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      id="course"
                                      name="course"
                                      value={this.state.course}
                                      onChange={this.handleChage}
                                    />
                                  </div>
                                  <div className="form-group">
                                    <label htmlFor="usn">USN</label>
                                    <input
                                      type="number"
                                      className="form-control"
                                      id="usn"
                                      name="usn"
                                      value={this.state.usn}
                                      onChange={this.handleChage}
                                    />
                                  </div>
                                </form>
                              </Modal.Body>
                    
                              <Modal.Footer>
                                <Button variant="secondary" onClick={this.handleClose}>
                                  Close
                                </Button>
                                <Button variant="primary" onClick={this.updateAccount}>Save changes</Button>
                              </Modal.Footer>
                            </Modal>
                          </div>
                         
                        )
                    } else {
                        return (
                            <h1 onLoad={
                                this.props.history.push("/login")
                            }>h</h1>
                        )
                    }

                }
            }
             </LoginConsumer>
     
    );
  }
}

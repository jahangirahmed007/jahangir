import React from 'react';
import './App.css';
import axios from 'axios';

class App extends React.Component {
  state = {
    text: "",
    links: {},
    resp: ""
  }

  inputChange = e => {
    this.setState({ text: e.target.value });
  }

  onSubmit = (e) => {
    e.preventDefault();
    axios.get(`http://localhost:5000/title/?address=${this.state.text}`)
      .then(res => {
        if (res.data.msg) {
          alert(res.data.msg);
        }
        this.setState({
          links: res.data,
          resp: res.data
        })
      })
      .catch(err => {
        alert(err + err.code);
      })
  }

  render() {
    return (
      <div className="app w-100 d-flex justify-content-center   align-items-center flex-column  pt-4 " >
        <form className="w-50 mb-5">
          <div className="input-group ">
            <input type="text" className="form-control" onChange={this.inputChange} placeholder="Enter URL Here" value={this.state.text} aria-describedby="addon-wrapping" />
            <button className="btn btn-danger btn-sm " onClick={this.onSubmit}> Search </button>
          </div>
        </form>
        <div className="w-100 mt-5">
          <div className="row">
            <div className="col-6 text-center">
              <h1>CSS Links</h1>
              <p className="text-primary ">{this.state.links.cssLinks}</p>
            </div>
            <div className="col-6 text-center">
              <h1>JS Links</h1>
              <p className="text-info ">{this.state.links.jsLinks}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default App;

import React from 'react';
import logo from './logo.svg';
import Tabletop from 'tabletop';
import './App.css';
import './assets/fomantic/dist/semantic.css';
import { Container, Header } from 'semantic-ui-react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    Tabletop.init({
      key: 'https://docs.google.com/spreadsheets/d/1igfFQgpLxZxDOcW8KzlCX_Rk4LQzmEnMzEXpXxTTYz0/edit?usp=sharing',
      callback: googleData => {
        this.setState({
          data: googleData
        })
      },
      simpleSheet: true
    })


    //for api to express
    // this.getList();
  }
  // api to express
  /* getList = () => {
    fetch('/api/getGoogleData')
      .then(res => res.json())
      .then(data => this.setState({ data }))
      
  }   */


  render() {

    console.log('updated state --->', this.state);
    return (
      <Router>
        <Route exact path="/">
          <AllProduct />
        </Route>
        <Route path="/:id" render={(props) => <ProductDetail {...props} data={this.state.data} />} />

      </Router>


    );
  }
}
class AllProduct extends React.Component {
  constructor() {
    super()
    this.state = {
      data: []
    }
  }
  render() {
    Tabletop.init({
      key: 'https://docs.google.com/spreadsheets/d/1igfFQgpLxZxDOcW8KzlCX_Rk4LQzmEnMzEXpXxTTYz0/edit?usp=sharing',
      callback: googleData => {
        this.setState({
          data: googleData
        })
      },
      simpleSheet: true
    })
    return (
      <div className="App" style={{ margin: 10, marginTop: 30 }}>
        <div className="ui text menu" style={{ marginTop: "-20px", marginLeft: "-1px", marginBottom: 19, fontSize: "13px" }}>
          <div className="item" style={{ marginRight: 0, paddingRight: 0 }}>
            <img src="QreadLogo.png" />
          </div>
          <div className="item" style={{ marginLeft: 0 }}>
            <p>QREAD</p>
          </div>
        </div>

        <div id="person-details" className="ui stackable cards">
          {
            this.state.data.map(obj => {
              return (
                <div key={obj.id} className="card">
                  <div className="content">
                    <div className="header left aligned" style={{ fontSize: 25 }}>{obj.specification}</div>
                    {/* <div className="meta left aligned" style={{fontFamily:"Khmer"}}>
                      <a>{obj.favFoodkh}</a>
                    </div> */}
                    <div className="description left aligned" style={{ fontSize: 15 }}>
                      For bed size: {obj.size}
                    </div>
                  </div>
                  <div className="image">
                    <img src={obj.img_src} alt={obj.specification} />
                  </div>
                  <div className="content">

                    <div className="meta left aligned">
                      <a>#{obj.specification}</a>
                    </div>
                    <div className="description left aligned">
                      {obj.meta}
                    </div>
                  </div>
                  
                  <div className="content">
                    <table className="ui basic selectable celled table">
                      <tbody>
                        <tr>
                          <td><i className="tag icon"></i> Unit Price:</td>
                          <td>${obj.unit_price}</td>
                        </tr>
                        <tr>
                          <td><i className="cogs icon"></i> Material:</td>
                          <td>{obj.material}</td>
                        </tr>
                        
                        <tr>
                          <td><i className="paint brush icon"></i> Color:</td>
                          <td>{obj.pattern +" "+obj.color}</td>
                        </tr>
                        <tr>
                          <td><i className="chess board icon"></i> Fabric:</td>
                          <td>{obj.thread+" "+obj.quality}</td>
                        </tr>
                        <tr>
                          <td><i className="dolly flatbed icon"></i> QTY available:</td>
                          <td>{obj.qty} pcs</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="content">
                  {/* <button className="ui right floated primary button" onClick={addtobasket(obj)}>Add to Basket</button> */}
                  <button className="ui primary right floated right labeled icon button" onClick={addtobasket(obj)}>
                    <i className="right arrow icon"></i>
                      Add to Basket
                  </button>
                  <button className="ui left floated button">Reduce Stock</button>
                </div>

                </div>
              )
            })
          }
        </div>
      </div>
    );
  }
}

const addtobasket=(obj) =>(e)=>{
  /* console.log(e)
  console.log(obj) */
  alert(obj.specification + " has been added to basket!")
}

function ProductDetail(props) {
  let { id } = useParams();
  let data = props.data;
  let x = [];
  console.log("this is id", id);
  data.forEach(element => {
    if (element.code === id) {
      x = new Array(element);
      console.log(x);
    }
  });
  console.log("this is data", data);
  return (
    <div className="App" style={{ margin: 10, marginTop: 30 }}>
      <div className="ui text menu" style={{ marginTop: "-20px", marginLeft: "-1px", marginBottom: 19, fontSize: "13px" }}>
        <div className="item" style={{ marginRight: 0, paddingRight: 0 }}>
          <img src="QreadLogo.png" />
        </div>
        <div className="item" style={{ marginLeft: 0 }}>
          <p>QREAD</p>
        </div>
      </div>

      <div id="person-details" className="ui stackable cards">
        {
          x.map(obj => {
            return (
              <div key={obj.id} className="card">
                <div className="content">
                  <div className="header left aligned" style={{ fontSize: 25 }}>{obj.specification}</div>
                  {/* <div className="meta left aligned" style={{fontFamily:"Khmer"}}>
                      <a>{obj.favFoodkh}</a>
                    </div> */}
                  <div className="description left aligned" style={{ fontSize: 15 }}>
                    For bed size: {obj.size}
                  </div>
                </div>
                <div className="image">
                  <img src={obj.img_src} alt={obj.specification} />
                </div>
                <div className="content">

                  <div className="meta left aligned">
                    <a>#{obj.specification}</a>
                  </div>
                  <div className="description left aligned">
                    {obj.meta}
                  </div>
                </div>
                
                <div className="content">
                  <table className="ui selectable celled basic table">
                    <tbody>
                      <tr>
                        <td><i className="tag icon"></i> Unit Price:</td>
                        <td>${obj.unit_price}</td>
                      </tr>
                      <tr>
                        <td><i className="cogs icon"></i> Material:</td>
                        <td>{obj.material}</td>
                      </tr>
                      <tr>
                        <td><i className="paint brush icon"></i> Color:</td>
                        <td>{obj.pattern +" "+obj.color}</td>
                      </tr>
                      <tr>
                        <td><i className="chess board icon"></i> Fabric:</td>
                        <td>{obj.thread+" "+obj.quality}</td>
                      </tr>
                      <tr>
                        <td><i className="dolly flatbed icon"></i> QTY available:</td>
                        <td>{obj.qty} pcs</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="content">
                  {/* <button className="ui right floated primary button" onClick={addtobasket(obj)}>Add to Basket</button> */}
                  <button className="ui primary right floated right labeled icon button" onClick={addtobasket(obj)}>
                    <i className="right arrow icon"></i>
                      Add to Basket
                  </button>
                  <button className="ui left floated button">Reduce Stock</button>
                </div>

              </div>
            )
          })
        }
      </div>
    </div>
  );
}

export default App;

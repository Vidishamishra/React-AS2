import React from 'react';
import logo from './logo.svg';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';  



class App extends React.Component{
  constructor(props){
    super(props)
      this.state=({
        users: {},
        ur_followers:{},  
        followers:0,
        following:0,
        user:'vidishamishra',
        isFollower:0   
      })
    }

    fetchData=()=>{
      fetch(`https://api.github.com/search/users?q=${this.state.user}`)
      .then(res=>res.json())
      .then(
        (result)=>{
          this.setState({
            users: result,
            isFollower:0
          });
        },
        (error)=>{
          this.setState({
            isFollower:0
          })
        }
      )
    }
    
   fetchFollowers=(user2)=>{
     
        const val2=`https://api.github.com/users/${user2}`
        
        fetch(val2)
        .then(res=>res.json())
        .then(
           (result)=>{
             console.log(result)
             this.setState({
               ur_followers:result,
               isFollower:1
             });
           },
           (error)=>{
             this.setState({total:0})      
           })
       }  

    componentDidMount(){
        this.fetchData()   
    }   
     
  //  getFollowers(url){    
  //    this.setState({
  //      user:url,
  //      isFollower:1
  //    })
  //    this.fetchFollowers();  
  //  }      

    changeUser=(e)=>{
      e.preventDefault()
      this.setState({
        user:e.target.value
      })
    }

    checkUser=(e)=>{
         e.preventDefault();
         this.fetchData()
  }              

    render(){
  


  // const userProfiles1=()=>{
  //     return this.state.ur_followers.items && this.state.ur_followers.items.map((item, index)=>{
  //       return <div className="card col-sm-3 flip-card container" >
  //           <div className="flip-card-inner">
  //               <div className="flip-card-front">
  //                 {<img src={item.avatar_url} className="imageBox"/>}
  //                       <p>USERNAME : {item.name}</p>
  //               </div>                                  
  //           <div className="flip-card-back">
  //               <h5 >Name:{item.name}</h5><br/>
  //             <a href={item.html_url} className="btn btn-primary"><i class="fa fa-github" aria-hidden="true"></i></a><br/><h5>GITHUB LINK</h5>
               

  //              <button><a href={item.repos_url} ><i className="fa fa-git" aria-hidden="true"> repositary</i></a> </button><br/> 
  //           <a href={item.followers_url} ><i class="fa fa-chevron-circle-right" aria-hidden="true">Followers</i></a><button onClick={()=>this.fetchFollowers(item.login)}>Show</button>
  //         <br/><a href={item.following_url}><i class="fa fa-chevron-left" aria-hidden="true">Following</i></a>
  //       </div>   
  //     </div>
  //   </div>     
  // }) || []  }    
   
      

  const userProfiles=()=>{
    return this.state.users.items && this.state.users.items.map((item, index)=>{
        return <div className="card col-sm-3 flip-card container" >
            <div className="flip-card-inner">
                <div className="flip-card-front">
                    {<img src={item.avatar_url} className="imageBox"/>}
                  <p>USERNAME : {item.login}</p>
                </div>                                  
            <div className="flip-card-back">
                <h5 >Name:{item.login}</h5><br/>
                <a href={item.html_url} className="btn btn-primary"><i class="fa fa-github" aria-hidden="true"></i></a><br/><h5>GITHUB LINK</h5>
               
  <button><a href={item.repos_url} ><i className="fa fa-git" aria-hidden="true"> repositary</i></a> </button><br/> 
            <a href={item.followers_url} ><i class="fa fa-chevron-circle-right" aria-hidden="true">Followers:{this.state.ur_followers.followers}</i></a><button onClick={()=>this.fetchFollowers(item.login)}>Show</button>
            
              <br/><a href={item.following_url}><i class="fa fa-chevron-left" aria-hidden="true">Following:{this.state.ur_followers.following}</i></a>
            </div>   
        </div>
  </div>   
  }) || []   }      

          return(
              <div>
                 <div className="main">
                 <header className="jumbotron d-none d-sm-block">
                     <div className="container">
                         <div className="row row- ">
                               <div className="col-12 col-sm-6 ">
                                   <h1>GITHUB USER INFORMATION</h1>                                                                                               
              <div>
                 <div className="container h-100 ">
                             <div className="col-10 col-md-8 col-lg-8 ">
                               <form className="form-example" id="change" onSubmit={this.checkUser}>
                                       <div className="form-group" >
                                           <label htmlFor="username">GITHUB USER NAME</label>
                                           <input type="text" className="form-control username" onChange={this.changeUser}/>
                                       </div> 
                                       <button type="submit" className="btn btn-primary btn-customized" >SEARCH</button>
                               </form>
                             </div>    
                     </div>
                </div>                     
              </div>
                    <div className="col-12 col-sm">
                  </div>
                 </div>
               </div>
              </header>
             </div>
            <div className="container">

              <div className="column">

                  <div className="row userWidth">
                    {userProfiles()}
                                  
                  </div>  
              </div>
            </div>
           </div>    
        );      
    }
};


export default App;

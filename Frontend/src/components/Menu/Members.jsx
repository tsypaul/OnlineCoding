import React from 'react';
import './Members.css';
import axios from "axios";
import PersonAddOutlined from "@material-ui/icons/PersonAddOutlined";

class Members extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            username:'' 
        };
        this.handleChange = this.handleChange.bind(this);
        this.addMember = this.addMember.bind(this);
        this.removeMember = this.removeMember.bind(this);
        this.changeAdmin = this.changeAdmin.bind(this);
    }

    handleChange(e) {
        let target = e.target;
        let value = target.value;
        let name = target.name;
    
        this.setState({
          [name]: value
        });
    }

    addMember(){
        let req={
            projectId:this.props.id,
            username:this.state.username
        }
        let name=this.props.name;

        axios.post('/addMember',req).then(function(res){
            if(res.data==='User not found'||'User is already a member'){
                alert(res.data);
            }else{
                return (window.location='/Project/'+name+'/'+req.projectId)
            }
        })
    }
    
    removeMember({target}){
        let req={
            projectId:target.id,
            username:target.name
        }
        let name=this.props.name;
        axios.post('/removeMember',req).then(function(res){
            if(res.data==='Member was successfully removed from the project'){
                return (window.location='/Project/'+name+'/'+req.projectId);
            }else{
                alert(res.data)
            }
        });
        
    }

    changeAdmin({target}){
        let req={
            projectId:target.id,
            username:target.name
        }
        let name=this.props.name;
        axios.post('/changeAdmin',req).then(function(res){
            if(res.data==='Admin was successfully changed'){
                return (window.location='/Project/'+name+'/'+req.projectId);
            }else{
                alert(res.data)
            }
        });
        
    }

    render(){
        let menuClasses = 'Members';
        if(this.props.show){
            menuClasses = 'Members show';
        }
        return(
            <div>
                <nav className={menuClasses}>
                    <h2>Project Members</h2><br></br>
                    <input className='MembersInput' name="username" placeholder="Enter the username you wish to add" onChange={this.handleChange}/>
                    <button className='MembersButton' title='Add Member' onClick={this.addMember}><PersonAddOutlined></PersonAddOutlined></button>
                    <div>{this.props.members.map((member, index)=>(
                        <div key={index}>
                            <label className='MembersLabel'>{member.member}:</label>
                            <button className='MembersButton' id={this.props.id} name={member.member} onClick={this.changeAdmin}>Make Admin</button>
                            <button className='MembersButton Delete' id={this.props.id} name={member.member} onClick={this.removeMember}>Remove</button>
                        </div>
                    ))}</div>
                </nav>
            </div>
        )
    }
}




export default Members;
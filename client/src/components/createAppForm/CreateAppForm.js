import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, Button, HelpBlock, Radio } from 'react-bootstrap';
import ImageUploader from 'react-images-upload';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

// import validator from 'validator';

function FieldGroup({ id, label, help, validationState, ...props }) {
    
    return (
      <FormGroup controlId={id} validationState={validationState}>
        <ControlLabel>{label}</ControlLabel>
        <FormControl {...props} />
        {help && <HelpBlock>{help}</HelpBlock>}
      </FormGroup>
    );
    
  }

  FieldGroup.propTypes = {
    id: PropTypes.string,
    label: PropTypes.string,
    help: PropTypes.string,
    validationState: PropTypes.any,
};


class CreateAppForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOwner: { value: false, validationState: null },
            formName: { value: '', validationState: null },
            url: { value: '', validationState: null },
            author: { value: '', validationState: null },
            genre: { value: '', validationState: null },
            tags: { value: '', validationState: null },
            decription: { value: '', validationState: null },
                    };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

      onDrop(pictureFiles, pictureDataURLs) {
          if(pictureFiles.files === undefined)
            this.props.thumbnailImage = pictureFiles;
        else {
            this.props.thumbnailImage = pictureFiles.files[0];
            this.props.screenshots = pictureFiles.files.splice(1, pictureFiles.length -1);
        }
	}
    
      handleChange(event) {

        var state = this.state;
        state[event.target.id].value = event.target.value;
  
        this.setState(state);

        // this.setState({value: event.target.value});
        // switch(event.target.id) {
        //     case 'form-name': {
        //         this.setState({name: })
        //         break;
        //     }
        //     case 'form-url': {
        //         break;
        //     }
        //     case 'form-author': {
        //         break;
        //     }
        //     case 'form-isOwner': {
        //         break;
        //     }
        //     case 'form-genre': {
        //         break;
        //     }
        //     case 'form-description': {
        //         break;
        //     }
        //     case 'form-tags': {
        //         break;
        //     }
        //     case 'form-image': {
        //         break;
        //     }
        // }
      }



    
      handleSubmit(event) {
        event.preventDefault();
        this.formIsValid();
        console.log(this.state);
      }


      formIsValid = () => {
        let state = this.state;
        let isValid = true;
  
        // if (!validator.isEmail(state.email.value)) {
        //   state.email.isValid = false; //this will trigger the has-error class
        //   state.email.message = 'Not a valid email address'; //will be displayed in the help-block for the email input
  
        //   this.setState(state);
        //   return false;
        // }
        for(let key in state) {
            let object = state[key];

            switch(key) {
                default : {
                    
                    if(!object.value || object.value === "") {
                        state[key].validationState = 'error';
                        isValid = false;
                    }
                    else state[key].validationState = null;
                    break;
                }
                case 'thumbnailImage' : {
                    if(!object.value) {state[key].validationState = 'error'; 
                    isValid = false;
                }
                    else state[key].validationState = null;
                    break;
                }
        }

      }
      this.setState(state);
  
      //additional validation checks here...

      return isValid;
    }
    

  render() {
      let {isOwner, formName, url, author, genre, tags, decription} = this.state;
    return (
        <div>
            <h1>Request An App (Create App in DB)</h1>

            <form onSubmit={this.handleSubmit}>
                <FieldGroup id="formName" label="App Name" type="text" placeholder="App Name" onChange={this.handleChange} validationState={formName.validationState} value={formName.value}/>
                <FieldGroup id="formUrl" label="URL" type="text" onChange={this.handleChange}/>

                <FormGroup onChange={this.handleChange}>
                    <ControlLabel>Did you make this? (email must be provided)</ControlLabel>
                    <br/>
                    <Radio value={true} name="formIsOwner" inline>
                        Yes
                    </Radio>{' '}
                    <Radio value={false} name="formIsOwner" inline>
                        No
                    </Radio>{' '}
                </FormGroup>
                {
                    () => {
                        if(this.state.showAuthorInput) {
                            return (
                                <FieldGroup id="formAuthor" label="Author Kerberos" type="text"/>
                            );
                        }

                    }
                }


                <FieldGroup id="formGenre" label="Medium" type="select" onChange={this.handleChange}/>

                <FormGroup onChange={this.handleChange}>
                    <ControlLabel>What kind of resource is this?</ControlLabel>
                    <br/>
                    <Radio name="radioGroup" inline>
                        Student Made
                    </Radio>{' '}
                    <Radio name="radioGroup" inline>
                        School Resource
                    </Radio>{' '}
                </FormGroup>





                <FormGroup controlId="formDescription" onChange={this.handleChange}>
                    <ControlLabel>Description</ControlLabel>
                    <FormControl componentClass="textarea" placeholder="describe your app here"  />
                </FormGroup>

                <FormGroup controlId="formTags" onChange={this.handleChange}>
                    <ControlLabel>Tags</ControlLabel>
                    <FormControl componentClass="textarea" placeholder="Hyphenate multi-word tags and seperate tags with spaces" />
                </FormGroup>

                <br/>
                <ControlLabel>Upload an Image</ControlLabel>
                <br/>

                <ImageUploader
                    withIcon={true}
                    buttonText='Upload Thumbnail'
                    onChange={this.onDrop}
                    imgExtension={['.jpg', '.gif', '.png', '.gif']}
                    maxFileSize={5242880}
                    withPreview={true}
                >
                </ImageUploader>

                <Button type="submit">Submit</Button>

            </form>
        </div>
    );
  }
}

CreateAppForm.propTypes = {
    thumbnailImage: PropTypes.object,
    screenshots: PropTypes.arrayOf(PropTypes.object)

}

const mapStateToProps = (state, {ownProps}) =>  {
    return {
        
    }
}

export default connect(mapStateToProps)(CreateAppForm);
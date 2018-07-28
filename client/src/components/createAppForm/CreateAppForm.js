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
            formIsOwner: { value: false, validationState: null },
            formName: { value: '', validationState: null },
            formUrl: { value: '', validationState: null },
            formAuthor: { value: '', validationState: null },
            formGenre: { value: '', validationState: null },
            formTags: { value: '', validationState: null },
            formDecription: { value: '', validationState: null },
            formIsOfficialResource: {value: null, validationState: null},
            formImage: { validationState: null},
            images: null
                    };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onDrop = this.onDrop.bind(this);
      }

      onDrop(pictureFiles, pictureDataURLs) {
        let state = this.state;
          if(pictureFiles.files === undefined)
            state.images = pictureFiles;
        else {
            state.images = pictureFiles.files[0];
            state.screenshots = pictureFiles.files.splice(1, pictureFiles.length -1);
        }
	}
    
      handleChange(event) {

        var state = this.state;
        state[event.target.id].value = event.target.value;
        this.setState(state);
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
            if(key.indexOf("form") == -1)
                continue; // skip all non form values
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
                case 'formImage' : {
                    if(!this.state.images) {state[key].validationState = 'error'; 
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
      let {formIsOwner, formName, formUrl, formAuthor, formGenre, formTags, formDecription, formIsOfficialResource, formImage} = this.state;
    return (
        <div>
            <h1>Request An App (Create App in DB)</h1>

            <form onSubmit={this.handleSubmit}>
                <FieldGroup 
                    id="formName" 
                    label="App Name" 
                    type="text" 
                    placeholder="App Name" 
                    onChange={this.handleChange} 
                    validationState={formName.validationState} 
                    value={formName.value}/>

                <FieldGroup 
                    id="formUrl" 
                    label="URL" 
                    type="text" 
                    onChange={this.handleChange}
                    validationState={formUrl.validationState}
                    value={formUrl.value}/>

                <FormGroup 
                onChange={this.handleChange} 
                value={formIsOwner.value}
                validationState={formIsOwner.validationState}>
                    <ControlLabel>Did you make this? (email must be provided)</ControlLabel>
                    <br/>
                    <Radio value={true} id="formIsOwner" inline>
                        Yes
                    </Radio>{' '}
                    <Radio value={false} id="formIsOwner" inline>
                        No
                    </Radio>{' '}
                </FormGroup>
                {
                    () => {
                        if(!formIsOwner.value) {
                            return (
                                <FieldGroup 
                                    id="formAuthor" 
                                    label="Author Kerberos" 
                                    type="text" 
                                    validationState={formAuthor.validationState} 
                                    value={formAuthor.value}/>
                            );
                        }

                    }
                }


                <FieldGroup 
                    id="formGenre" 
                    label="Medium" 
                    type="select" 
                    onChange={this.handleChange}
                    validationState={formGenre.validationState} 
                    value={formGenre.value}/>

                <FormGroup 
                    onChange={this.handleChange} 
                    validationState={formIsOfficialResource.validationState} 
                    value={formIsOfficialResource.value}>
                    <ControlLabel>What kind of resource is this?</ControlLabel>
                    <br/>
                    <Radio id="formIsOfficialResource" value={false} inline>
                        Student Made
                    </Radio>{' '}
                    <Radio id="formIsOfficialResource" value={true} inline>
                        School Resource
                    </Radio>{' '}
                </FormGroup>





                <FormGroup 
                    controlId="formDescription" 
                    onChange={this.handleChange}
                    validationState={formDecription.validationState}
                    value={formDecription.value}>
                    <ControlLabel>Description</ControlLabel>
                    <FormControl componentClass="textarea" placeholder="describe your app here"  />
                </FormGroup>

                <FormGroup 
                    controlId="formTags" 
                    onChange={this.handleChange}
                    value={formTags.value}
                    validationState={formTags.validationState}>
                    <ControlLabel>Tags</ControlLabel>
                    <FormControl componentClass="textarea" placeholder="Hyphenate multi-word tags and seperate tags with spaces" />
                </FormGroup>

                <br/>
                <FormGroup controlId="formImage" validationState={formImage.validationState}>
                <ControlLabel>Upload Images</ControlLabel>
                <FormControl.Static> Your first image will be a thumbnail, and the rest screenshots</FormControl.Static>
              </FormGroup>                    
                <br/>

                <ImageUploader
                    withIcon={true}
                    buttonText='Upload Thumbnail'
                    onChange={this.onDrop}
                    imgExtension={['.jpg', '.gif', '.png']}
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

const mapStateToProps = (state, {ownProps}) =>  {
    return {
        
    }
}

export default connect(mapStateToProps)(CreateAppForm);
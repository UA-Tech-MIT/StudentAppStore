import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, Button, HelpBlock, Radio } from 'react-bootstrap';
import ImageUploader from 'react-images-upload';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {createApp} from '../../actions/AsyncActionCreators';

// import validator from 'validator';
//TODO migrate to semantic

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

const getDefaultState = () => {
    return {
        formIsOwner: { value: false, validationState: null },
        formName: { value: '', validationState: null },
        formUrl: { value: '', validationState: null },
        formAuthor: { value: '', validationState: null },
        formGenre: { value: '', validationState: null },
        formTags: { value: '', validationState: null },
        formDescription: { value: '', validationState: null },
        formIsOfficialResource: { value: null, validationState: null },
        formImage: { value: 'testimg.jpg', validationState: null },
        images: null
    };
};


class CreateAppForm extends Component {
    constructor(props) {
        super(props);
        this.state = getDefaultState();

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.resetForm = this.resetForm.bind(this);
    }

    onDrop(pictureFiles, pictureDataURLs) {
        let state = this.state;
        if (pictureFiles.files === undefined)
            state.images = pictureFiles;
        else {
            state.images = pictureFiles.files[0];
            state.screenshots = pictureFiles.files.splice(1, pictureFiles.length - 1);
        }
        this.setState(state);
    }

    resetForm() {
        this.setState(getDefaultState());
    }

    handleChange(event) {

        let state = this.state;
        state[event.target.id].value = event.target.value;
        this.setState(state);
    }

    handleSubmit(event) {
        event.preventDefault();
        let validForm = this.formIsValid();

        if (validForm) {
            let args = {};
            let state = this.state;
            for (let key in state) {
                args[key.substr(4).toLowerCase()] = state[key].value;
            }
            this.props.createApp(args);
        }
    }


    formIsValid() {
        let state = this.state;
        let isValid = true;
        for (let key in state) {
            if (key.indexOf("form") == -1)
                continue; // skip all non form values

            let object = state[key];
            switch (key) {
                default: {
                    if (!object.value || object.value === "") {
                        state[key].validationState = 'error';
                        isValid = false;
                    }
                    else
                        state[key].validationState = null;
                    break;
                }
                case 'formImage': {
                    if (!this.state.images) {
                        state[key].validationState = 'error';
                        isValid = false;
                    }
                    else
                        state[key].validationState = null;
                    break;
                }
            }
        }
        this.setState(state);
        return isValid;
    }

  render() {
      let {formIsOwner, formName, formUrl, formAuthor, formGenre,
         formTags, formDescription, formIsOfficialResource, formImage} = this.state;

    return (
        <div className="page-template">
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
                // value={formIsOwner.value}
                validationState={formIsOwner.validationState}>
                    <ControlLabel>Did you make this? (email must be provided)</ControlLabel>
                    <br/>
                    <Radio value={true} name="ownerGroup" id="formIsOwner" inline>
                        Yes
                    </Radio>{' '}
                    <Radio value={false} name="ownerGroup" id="formIsOwner" inline>
                        No
                    </Radio>{' '}
                </FormGroup>


                <FormGroup
                    controlId="formAuthor"
                    className={formIsOwner.value === 'false' ? '' : 'hidden'}
                    onChange={this.handleChange}
                    validationState={formAuthor.validationState}
                    value={formAuthor.value}>
                    <ControlLabel>Author</ControlLabel>
                    <FormControl type="text" placeholder="Author kerberos"  />
                </FormGroup>



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
                    <Radio id="formIsOfficialResource" name="officialResourceGroup" value={false} inline>
                        Student Made
                    </Radio>{' '}
                    <Radio id="formIsOfficialResource" name="officialResourceGroup" value={true} inline>
                        School Resource
                    </Radio>{' '}
                </FormGroup>





                <FormGroup
                    controlId="formDescription"
                    onChange={this.handleChange}
                    validationState={formDescription.validationState}
                    value={formDescription.value}>
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
                <FormControl.Static> Your first image will be used as a thumbnail</FormControl.Static>
              </FormGroup>
                <br/>

                <ImageUploader
                    withIcon={true}
                    buttonText='Upload Thumbnail'
                    onChange={this.onDrop}
                    imgExtension={['.jpg', '.gif', '.png']}
                    maxFileSize={5242880}
                    withPreview={true}
                    buttonType="button"
                >
                </ImageUploader>

                <Button type="submit">Submit</Button>{'     '}
                <Button type="reset" onClick={this.resetForm}>Clear</Button>

            </form>
        </div>
    );
  }
}

CreateAppForm.propTypes = {
    createApp: PropTypes.func.isRequired
};

const mapStateToProps = (state, {ownProps}) =>  {
    return {

    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
      createApp
    }, dispatch);
  };


export default connect(mapStateToProps, mapDispatchToProps)(CreateAppForm);

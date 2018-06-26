import React from 'react';
import { FormGroup, ControlLabel, FormControl, Button, HelpBlock, Checkbox, Radio } from 'react-bootstrap';
import ImageUploader from 'react-images-upload';


// this is a FACTORY FUNCTION. It produces all the similar looking components by returning this chunk of JSX
/* eslint-disable*/
function FieldGroup({ id, label, help, ...props }) {
    return (
      <FormGroup controlId={id}>
        <ControlLabel>{label}</ControlLabel>
        <FormControl {...props} />
        {help && <HelpBlock>{help}</HelpBlock>}
      </FormGroup>
    );
  }
  

//TODO
//make the real Submit and App, and Edit an App Form views
// make a sign up form (users)

export default class TestForm extends React.Component {

    onDrop(pictureFiles, pictureDataURLs) {// handles the image upload with these inputs
        this.setState({
            pictures: this.state.pictures.concat(pictureFiles),
        });
    }


    render() {
        return (
            <div>
            <h3> Submit An App! </h3>
            <form>
              <FieldGroup
                id="formControlsName"
                type="text"
                label="Name"
                placeholder="Enter text"
              />
            <FieldGroup id="formControlsAuthor" label="Author" type="text" />

              <FieldGroup
                id="formControlsEmail"
                type="email"
                label="Email address (optional)"
                placeholder="Enter email"
              />
              <FieldGroup
                id="formControlsImage"
                type="file"
                label="Upload a thumbnail"
                help="Files must be size <= X Mb. Accepted extensions are jpg, png, gif, and ico (for now)."
              />
          
              {/* <Checkbox checked readOnly>
                Checkbox
              </Checkbox>
              <Radio checked readOnly>
                Radio
              </Radio>
          
              <FormGroup>
                <Checkbox inline>1</Checkbox> <Checkbox inline>2</Checkbox>{' '}
                <Checkbox inline>3</Checkbox>
            </FormGroup> */}
            
                <FormGroup>
                <ControlLabel>What kind of resource is this?</ControlLabel>
                <br/>
                <Radio name="radioGroup" inline>
                    Student Made
                </Radio>{' '}
                <Radio name="radioGroup" inline>
                    School Resource
                </Radio>{' '}
                </FormGroup>

                          
              <FormGroup>
                <ControlLabel>Did you make this? (email must be provided)</ControlLabel>
                <br/>
                <Radio name="radioGroupMake" inline>
                    Yes
                </Radio>{' '}
                <Radio name="radioGroupMake" inline>
                    No
                </Radio>{' '}
              </FormGroup>

          
              <FormGroup controlId="formControlsSelect">
                <ControlLabel>Select</ControlLabel>
                <FormControl componentClass="select" placeholder="select">
                  <option value="select">select</option>
                  <option value="other">...</option>
                </FormControl>
              </FormGroup>
              <FormGroup controlId="formControlsSelectMultiple">
                <ControlLabel>Multiple select</ControlLabel>
                <FormControl componentClass="select" multiple>
                  <option value="select">select (multiple)</option>
                  <option value="other">...</option>
                </FormControl>
              </FormGroup>
          
              <FormGroup controlId="formControlsTextarea">
                <ControlLabel>Description</ControlLabel>
                <FormControl componentClass="textarea" placeholder="textarea" />
              </FormGroup>
          
              <FormGroup>
                <ControlLabel>Static text</ControlLabel>
                <FormControl.Static>You can also add static text and other info to the page. Get creative and make the css look nice!</FormControl.Static>
              </FormGroup>
                <br/>
                <ControlLabel>Upload an Image</ControlLabel>
                <br/>
            <ImageUploader
                withIcon={true}
                buttonText='Choose images'
                onChange={this.onDrop}
                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                maxFileSize={5242880}
                withPreview={true}
            />
              <Button type="submit">Submit</Button>
            </form>
            </div>
          );
          
    }
}

//add support to hold for last user input content in session
// const mapStateToProps = (state) => {
//    return {

//    }
// }
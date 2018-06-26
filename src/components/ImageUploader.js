import React from 'react';
import ImageUploader from 'react-images-upload';


//TODO establish a CDN or schema for storing references (paths) to images in the DB
// should be fairly straighforward, to start you can just save the files locally to the public folder
// that should be enough for simulation purposes


export default class ImageUploadComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = { pictures: [] };
        this.onDrop = this.onDrop.bind(this);
    }

    onDrop(pictureFiles, pictureDataURLs) {
        this.setState({
            pictures: this.state.pictures.concat(pictureFiles),
        });
    }

    render() {
        return (
            <ImageUploader
                withIcon={true}
                buttonText='Choose images'
                onChange={this.onDrop}
                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                maxFileSize={5242880}
                withPreview={true}
            />
        );
    }
}
import React from 'react';
import ImageUploader from 'react-images-upload';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


//TODO establish a CDN or schema for storing references (paths) to images in the DB
// should be fairly straighforward, to start you can just save the files locally to the public folder
// that should be enough for simulation purposes


class ImageUploadComponent extends React.Component {

    constructor(props) {
        super(props);
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

const onDrop = (pictureFiles, pictureDataURLs) => {
    this.setState({
        pictures: this.state.pictures.concat(pictureFiles),
    });
    return {
        type: 'DEFAULT'
    };
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ onDrop }, dispatch);
}

const mapStateToProps = () => {
    return {
        pictures: []
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ImageUploadComponent);
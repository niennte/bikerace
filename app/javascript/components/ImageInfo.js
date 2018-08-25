import React from "react"

class ImageInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            image: props.image,
            className: props.className
        };

        this.handleModalOpen = this.handleModalOpen.bind(this);
    }

    handleModalOpen(e) {
        this.props.handleModalOpen(e)
    }

    render () {

        const { image, className } = this.state;

        return (
            <React.Fragment>
                <div className={className}>
                    <a
                        onClick={ this.handleModalOpen }
                        data-id={ image.id }
                        href="#"
                        title="View larger image"
                        className="zoom fa fa-search "/>

                    <br/>

                    <a
                        href={ image.link_src }
                        className="flickr fa fa-flickr"
                        title="View on Flickr"
                        target="_blank"/>
                </div>
            </React.Fragment>
        );
    }
}

export default ImageInfo

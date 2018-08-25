import React from "react"
import PropTypes from "prop-types"
import Pagination from "./Pagination"
import Lightbox from "./Lightbox"
import ImageInfo from "./ImageInfo"
import Placeholder from "./Placeholder"
import axios from "axios"
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

// @TODO:
// - refactor into a components image placeholder and image info
// - enable dynamic layout change
// - simplify getPage
// - simplify loadImage


class Gallery extends React.Component {

    constructor(props) {
        super(props);

        this.SERVICE_PATH = props.service;

        this.direction = "next";

        this.state = {
            flickr: this.indexImages(props.flickr),
            modal: false,
            currentImage: {},
            pageLoaded: false,
            layout: "masonry"
        };
        this.getPage = this.getPage.bind(this);
        this.handleModalOpen = this.handleModalOpen.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.loadNextImage = this.loadNextImage.bind(this);
        this.loadPreviousImage = this.loadPreviousImage.bind(this);
    }

    indexImages(flickr) {
        flickr.collection = flickr.collection.map((image, i) => {
            image.id = i;
            return image
        });
        return flickr
    }

    pageToLoad() {
        let page;
        switch (this.direction) {
            case "next": {
                page = this.state.flickr.page + 1;
                break;
            }
            case "previous": {
                page = this.state.flickr.page - 1;
                break;
            }
            default: {
                page = this.state.flickr.page;
            }
        }
        return page;
    }

    getPage(page, pageSize) {
        // make module portable
        const url = new URL(window.location);
        page = page || this.state.flickr.page;
        pageSize = pageSize || this.state.flickr.page_size;
        const search = "?" + "page=" + page + "&page_size=" + pageSize;
        // service path
        const service = url.protocol + "//" + url.host + url.pathname + ".json" + search;
        // browser path
        const path = url.protocol + "//" + url.host + url.pathname + search;
        axios.get(service)
            .then(res => {
                const flickr = this.indexImages(res.data);
                this.setState({flickr});
                // update browser path
                window.history.pushState({path: path}, "", path);
                // reload lightbox image
                let imageId = 0;
                if (this.direction === "previous") {
                    // start from the last
                    imageId = this.state.flickr.collection.length - 1
                }
                const currentImage = this.state.flickr.collection[imageId];
                this.setState({
                    currentImage: currentImage,
                    pageLoaded: true
                });
            });
    }

    loadImage(imageID) {
        let currentImage = this.state.flickr.collection[imageID];
        if (!currentImage) {
            this.setState({
                pageLoaded: false
            });
            this.getPage(this.pageToLoad());
        } else {
            this.setState({
                pageLoaded: true,
                currentImage: currentImage
            });
        }
    }

    loadNextImage(e) {
        e.preventDefault();
        let id = parseInt(e.currentTarget.dataset.id) + 1;
        this.direction = "next";
        this.loadImage(id)
    }

    loadPreviousImage(e) {
        e.preventDefault();
        let id = parseInt(e.currentTarget.dataset.id) - 1;
        this.direction = "previous";
        this.loadImage(id)
    }

    handleModalOpen(e) {
        e.preventDefault();
        let id = e.currentTarget.dataset.id;
        let currentImage = this.state.flickr.collection[id];
        this.setState({
            currentImage: currentImage
        });
        this.toggleModal()
    }

    toggleModal() {
        this.setState({
            modal: !this.state.modal
        });
    }

    render() {

        const {flickr, modal, currentImage, pageLoaded, loading, layout} = this.state;

        return (
            <React.Fragment>

                <div className="container">

                    <Pagination
                        getPage={this.getPage}
                        pageLoaded={pageLoaded}
                        collection={flickr}/>
                </div>

                <div className="container p-0 photos">

                    <div className={`card-columns ${layout}`}>

                        { flickr.collection.map((image, i) => {

                                return (
                                    <div
                                        style = {{
                                            backgroundImage: `url(${image.src})`
                                        }}
                                        className = { `card b-0 p-0 ${image.orientation}` }
                                        key={i} >

                                        <Placeholder
                                            className = "card-img-top img-fluid b-0 m-0 p-0"
                                            layout={layout}
                                            image={image} />

                                        <ImageInfo
                                            className="photoInfo"
                                            image={image}
                                            pageLoaded={pageLoaded}
                                            handleModalOpen={this.handleModalOpen} />
                                    </div>
                                );

                            }) }

                    </div>

                </div>

                <Lightbox
                    modal={modal}
                    currentImage={currentImage}
                    pageLoaded={pageLoaded}
                    handleModalOpen={this.handleModalOpen}
                    toggleModal={this.toggleModal}
                    loadNextImage={this.loadNextImage}
                    loadPreviousImage={this.loadPreviousImage} />

            </React.Fragment>
        );
    }
}

export default Gallery

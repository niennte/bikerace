import React from "react"
import PropTypes from "prop-types"
import Pagination from "./Pagination"
import Lightbox from "./Lightbox"
import axios from "axios"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

// @TODO: refactor into a components image placeholder and image info - enable dynamic layout change

class Gallery extends React.Component {

    constructor(props) {
        super(props)

        this.SERVICE_PATH = props.service

        this.state = {
            flickr: this.indexImages(props.flickr),
            modal: false,
            currentImage: {},
            pageLoaded: false,
            loading: null
        };
        this.getPage = this.getPage.bind(this);
        this.handleModalOpen = this.handleModalOpen.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.loadNextImage = this.loadNextImage.bind(this);
        this.loadPreviousImage = this.loadPreviousImage.bind(this);
    }

    indexImages(flickr) {
        flickr.collection = flickr.collection.map((image, i) => {
            image.id = i
            return image
        });
        return flickr
    }

    getPage(path = null, direction = 'next') {
        path = path || this.SERVICE_PATH
        let url = new URL(path);
        let service = url.protocol + "//" + url.host + url.pathname + ".json" + url.search;
        axios.get(service)
            .then(res => {
                const flickr = this.indexImages(res.data);
                this.setState({ flickr });
                window.history.pushState({path:path},"",path);
                // reload lightbox image if the modal is open
                if (this.state.modal) {
                    let imageId = null
                    if (direction == 'next') {
                        imageId = 0
                    }
                    if (direction == 'previous') {
                        imageId = this.state.flickr.collection.length - 1
                    }
                    let currentImage = this.state.flickr.collection[imageId]
                    this.setState({
                        currentImage: currentImage
                    });
                }
                this.setState({
                    pageLoaded: true
                });
            });
    }

    loadImage(imageID, direction) {
        let currentImage = this.state.flickr.collection[imageID]
        if (!currentImage) {
            let url = new URL(window.location);
            let page = (direction == 'next') ? this.state.flickr.page + 1 : this.state.flickr.page - 1;
            url.search = '?' + 'page=' + page + '&page_size=' + (this.state.flickr.page_size);
            let service = url.protocol + "//" + url.host + url.pathname + url.search;
            this.getPage(service, direction)
        } else {
            this.setState({
                currentImage: currentImage
            });
        }
    }


    loadNextImage(e) {
        e.preventDefault();
        let id = parseInt(e.currentTarget.dataset.id) + 1;
        this.loadImage(id, "next")
    }

    loadPreviousImage(e) {
        e.preventDefault();
        let id = parseInt(e.currentTarget.dataset.id) - 1;
        this.loadImage(id, "previous")
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

    toggleModal(e) {
        this.setState({
            modal: !this.state.modal
        });
    }



  render () {

    const { flickr, modal, currentImage, pageLoaded, loading } = this.state;

    return (
      <React.Fragment>
      <div className = "container" >
      <Pagination
          getPage = {this.getPage}
          pageLoaded={pageLoaded}
          loading={loading}

          collection = {flickr} />
      </div>

      <div className="container p-0 photos">
          <div className="card-columns">
              {flickr.collection.map((image, i) => {
                  const className = `card b-0 p-0 ${image.orientation} height-${image.height} width-${image.width}`;
                  const style = {
                      backgroundImage: `url(${image.src})`
                  };
                  const placeholderSrc = image.orientation == 'landscape' ? `//placehold.it/${image.width}x${image.height}/000` : `//placehold.it/${image.width}x${(image.height*0.6)}/000`
                  return (
                      <div className={className} style={style} key={i}>
                        <img className = "card-img-top img-fluid b-0 m-0 p-0" src={placeholderSrc} alt="" />

                          <div className="photoInfo">
                              <a
                                  onClick={this.handleModalOpen}
                                  data-id={image.id}
                                  href="#"
                                 title="View larger image"
                                 className="zoom fa fa-search "
                              >
                              </a>
                              <br/>
                              <a href={image.link_src}
                                 className = "flickr fa fa-flickr"
                                 title = 'View on Flickr'
                                 target = '_blank' />
                          </div>
                      </div>
                  );
              })}
          </div>
      </div>

      <Lightbox
          modal={modal}
          currentImage={currentImage}
          loading={pageLoaded}
          handleModalOpen={this.handleModalOpen}
          toggleModal={this.toggleModal}
          loadNextImage={this.loadNextImage}
          loadPreviousImage={this.loadPreviousImage}
      />

      </React.Fragment>
    );
  }
}

export default Gallery

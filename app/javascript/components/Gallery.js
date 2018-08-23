import React from "react"
import PropTypes from "prop-types"
import Pagination from "./Pagination"
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
            currentImage: {}
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
            });
    }

    loadNextImage(e) {
        e.preventDefault()
        let id = parseInt(e.currentTarget.dataset.id) + 1
        let currentImage = this.state.flickr.collection[id]
        if (!currentImage) {
            let url = new URL(window.location);
            url.search = '?' + 'page=' + (this.state.flickr.page + 1) + '&page_size=' + (this.state.flickr.page_size)
            let service = url.protocol + "//" + url.host + url.pathname + url.search;
            this.getPage(service, 'next')
        } else {
            this.setState({
                currentImage: currentImage
            });
        }
    }

    loadPreviousImage(e) {
        e.preventDefault()
        let id = parseInt(e.currentTarget.dataset.id) - 1
        let currentImage = this.state.flickr.collection[id]
        if (!currentImage) {
            let url = new URL(window.location);
            url.search = '?' + 'page=' + (this.state.flickr.page - 1) + '&page_size=' + (this.state.flickr.page_size)
            let service = url.protocol + "//" + url.host + url.pathname + url.search;
            this.getPage(service, 'previous')
        } else {
            this.setState({
                currentImage: currentImage
            });
        }
    }

    handleModalOpen(e) {
        e.preventDefault()
        let id = e.currentTarget.dataset.id
        let currentImage = this.state.flickr.collection[id]
        this.setState((prevState) => {
            let state =  {
                currentImage: currentImage
            };
            return state;
        });
        this.toggleModal()
    }

    toggleModal(e) {
        this.setState({
            modal: !this.state.modal
        });
    }

  render () {

    const { flickr, modal, currentImage } = this.state

    return (
      <React.Fragment>
      <div className = "container" >
      <Pagination
          getPage = {this.getPage}
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

          <Modal
              isOpen={modal}
              toggle={this.toggleModal}
              className="lightBoxModal my-0"
              style={{}}>


              <div className="photoInfo h-100 d-flex align-content-center align-items-center"
              style={{
                  width: "100%",
                  top: "0"
              }}>
                  <a href="#"
                     data-id={currentImage.id}
                     className = "next fa fa-chevron-right"
                     style={{
                         position: "absolute",
                         right: "7px"
                     }}
                     title='View next image'
                     onClick={this.loadNextImage}
                  />
                  <br />
                  <a href="#"
                     data-id={currentImage.id}
                     className = "previous fa fa-chevron-left"
                     style={{
                         position: "absolute",
                         left: "13px"
                     }}
                     title='View next image'
                     onClick={this.loadPreviousImage}
                  />
              </div>

              <div className="photoInfo">
                  <a className="fa fa-times" onClick={this.toggleModal} />

                  <br/>
                  <a href={currentImage.link_src}
                     className = "flickr fa fa-flickr"
                     title = 'View on Flickr'
                     target = '_blank'
                  />
              </div>


              <ModalBody>
                  <div className="image-wrapper">
                    <img src={currentImage.src} className="img-fluid" />
                  </div>
              </ModalBody>
          </Modal>

      </React.Fragment>
    );
  }
}

export default Gallery

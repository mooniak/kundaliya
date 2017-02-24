import React, { Component } from 'react';
import * as firebase from 'firebase';
import Modal from 'boron/OutlineModal';
import Dropzone from 'react-dropzone';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      droppedFiles: []
    };

    this.googleSignIn = this.googleSignIn.bind(this);
    this.hideErrorBox = this.hideErrorBox.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.renderFilePreviews = this.renderFilePreviews.bind(this);
  }

  componentDidMount() {
    const config = {
      apiKey: 'AIzaSyCHJ_1he6bthXCTMU6r6pXPmcULyqtMFDU',
      authDomain: 'kundaliya-test.firebaseapp.com',
      databaseURL: 'https://kundaliya-test.firebaseio.com',
      storageBucket: 'kundaliya-test.appspot.com',
      messagingSenderId: '599295915329'
    };
    firebase.initializeApp(config);
  }

  hideErrorBox() {
    this.refs.errorBox.hide();
  }

  googleSignIn() {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider).then((result) => {
      const user = result.user;

      this.setState({
        user: {
          uid: user.uid,
          avatar: user.photoURL,
          name: user.displayName,
          email: user.email
        }
      });
    }).catch(() => {
      this.refs.errorBox.show();
    });
  }

  onDrop(acceptedFiles) {
    const { droppedFiles } = this.state;

    acceptedFiles.forEach((file) => {
      droppedFiles.push(file);
    });

    this.setState({
      droppedFiles
    });
  }

  renderFilePreviews() {
    const { droppedFiles } = this.state;

    return droppedFiles.map((file, index) =>
      <div
        className="file-preview"
        key={index}
      >
        <img
          src={file.preview}
          alt={file.name}
        />
        <span>{file.name}</span>
      </div>
    );
  }

  render() {
    const { user, droppedFiles } = this.state;
    console.log('obj', droppedFiles);
    return (
      <div className="App">
        <div className="main-content">
          <h1 className="app-title">කුණ්ඩලිය / Kundaliya</h1>
          <div className="kunadliya-description">
            විරාම ලක්‍ෂණය කුණ්ඩලිය නමිවේ. මෙය යෙදෙන්නේ කිසියම් ශබ්දයක් සංකේතවත් කිරීමට නොවන
            බැවින් සිංහල හෝඩියට අනුව අකුරක්වත් පිල්ලක් වත් නොවේ. වාක්‍යයක් හෝ ඡේදයක් හෝ අවසන්
            වන බව හඟවනු වස් මෙම කුණ්ඩලිය යෙදෙයි. කුණ්ඩලිය, සිංහල භාෂාවට අනන්‍ය විරාම ලක්‍ෂණයකි
          </div>
          <h2 className="kunadliya">෴</h2>
          <div className="app-description">
            <span className="app-description-text">
              Make your Own Kundaliya: Share your version of Sinhala Kundaliya
            </span>
          </div>

          <br />

          {!user &&
            <div className="signin-container">
              <div className="signin-text">
                <span>Please sign in first...</span>
              </div>

              <button
                className="signin-btn google"
                onClick={this.googleSignIn}
              >
                <i className="fa fa-google" aria-hidden="true" />
                Sign in with Google
              </button>

              <button className="signin-btn facebook">
                <i className="fa fa-facebook" aria-hidden="true" />
                Sign in with Facebook
              </button>

              <button className="signin-btn github">
                <i className="fa fa-github-alt" aria-hidden="true" />
                Sign in with GitHub
              </button>
            </div>
          }


          {user &&
            <div className="dropzone-container">
              <Dropzone
                onDrop={this.onDrop}
                className="dropzone"
              >
                {(droppedFiles.length !== 0) ?
                  this.renderFilePreviews() :
                    <p>Try dropping some files here, or click to select files to upload.</p>
                }

              </Dropzone>
            </div>
          }
        </div>

        <Modal
          ref="errorBox"
          keyboard={this.callback}
          modalStyle={{
            backgroundColor: 'transparent'
          }}
        >
          <div className="error-box">
            <h4>Oops!</h4>
            <p>Something went wrong! Please try again.</p>
            <button
              onClick={this.hideErrorBox}
            >Ok</button>
          </div>
        </Modal>
      </div>
    );
  }
}

export default App;

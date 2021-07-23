import FileSaver from "file-saver";
import JSZip from "jszip";
import React from "react";
import Helmet from "react-helmet";
import cover from "../../content/images/2020/10/get-avatar-hufi.png";
import config from "../../data/SiteConfig";
import GoogleAds from "../components/GoogleAds";
import MainContainer from "../components/MainContainer/MainContainer";
import Sidebar from "../components/Sidebar/Sidebar";
import Layout from "../layout";
import { getPostList, getTagCategoryList } from "../utils/helpers";

class HemodynamicsNotes extends React.Component {
  download = false;

  constructor(props) {
    super(props);
    this.state = {
      inputUrl: "https://www.osmosis.org/notes/Hemodynamics",
      downloading: false,
      prefixFilename: "Chapter_1",
      progress: 0,
    };
  }

  onChangeUrl = (ev) => {
    this.setState({
      inputUrl: ev.target.value,
    });
  };

  onChangePrefix = (ev) => {
    this.setState({
      prefixFilename: ev.target.value,
    });
  };

  convertImageToCanvas = (image) => {
    const canvas = document.createElement("canvas");
    canvas.width = image.width * 2;
    canvas.height = image.height * 2;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(image, 0, 0, image.width * 2, image.height * 2);

    return canvas;
  };

  downloadSVGFronUrl = (src) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.setAttribute(
        "style",
        "flex:1;margin:5px;height:400px;object-fit:contain;"
      );
      img.crossOrigin = "anonymous";
      img.onload = () => {
        const canvas = this.convertImageToCanvas(img);
        const imgData = canvas.toDataURL();
        document.getElementById("png-list").appendChild(img);
        // const doc = new jsPDF();
        // doc.addImage(canvas.toDataURL(), 'PNG', 0, 0, img.width, img.height);
        // doc.save("a4.pdf");
        resolve(imgData);
      };

      img.src = src;
    });
  };

  onDownload = () => {
    if (this.state.downloading) return;
    this.setState({
      downloading: true,
      progress: 0,
    });
    document.getElementById("png-list").innerHTML = "";
    const { inputUrl, prefixFilename } = this.state;
    fetch(inputUrl).then((res) => {
      res.text().then((html) => {
        const parser = new DOMParser();
        const htmlDom = parser.parseFromString(html, "text/html");
        const nodes = htmlDom.getElementsByClassName("notes")[0]?.childNodes;
        if (!nodes) {
          alert("Not support!");
          this.setState({
            downloading: false,
            progress: 0,
          });
          return;
        }
        const urls = [];
        nodes.forEach((i) => {
          urls.push(i.data);
        });
        const pageCountPercent = 100 / urls.length;
        const zip = new JSZip();
        const zipFilename = "HemodynamicsNotes.zip";
        urls.forEach(async (url, index) => {
          const filename = `${prefixFilename}_page_${index + 1}.png`;
          const dataImg = await this.downloadSVGFronUrl(
            `https://cors-anywhere.herokuapp.com/${url}`
          );
          zip.file(filename, dataImg.split("base64,")[1], { base64: true });

          if (index === urls.length - 1) {
            zip.generateAsync({ type: "blob" }).then((blob) => {
              FileSaver.saveAs(blob, zipFilename);
              this.setState({
                downloading: false,
                progress: 100,
              });
            });
          } else {
            this.setState((prev) => ({
              progress: prev.progress + pageCountPercent,
            }));
          }
        });
      });
    });
  };

  render() {
    const { inputUrl, downloading, prefixFilename, progress } = this.state;
    const postEdges = this.props.data.allMarkdownRemark.edges;
    const postList = getPostList(postEdges);
    const { tagList, categoryList } = getTagCategoryList(postList);

    const sidebar = (
      <Sidebar
        tagList={tagList}
        categoryList={categoryList}
        links={config.sidebarLinks}
      />
    );

    return (
      <Layout>
        <div className="index-container">
          <Helmet title={`Download Hemodynamics Notes - ${config.siteTitle}`}>
            <meta
              property="og:title"
              content={`Download Hemodynamics Notes - ${config.siteTitle}`}
            />
            <meta
              property="og:description"
              content="Download Hemodynamics Notes"
            />
            <meta name="image" content={cover} />
            <meta property="og:image" content={cover} />
            <meta property="og:type" content="article" />
          </Helmet>
          <MainContainer sidebar={sidebar}>
            <div className="flex flex-column align-items-center">
              <a
                href="https://cors-anywhere.herokuapp.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="margin"
              >
                Please click here to allow CORS
              </a>
              <input
                className="padding-half width-full"
                placeholder="Enter url"
                value={inputUrl}
                onChange={this.onChangeUrl}
              />
              <div className="margin-top flex align-items-center">
                Prefix filename:
                <input
                  className="padding-half margin-left"
                  placeholder="Enter prefix filename"
                  value={prefixFilename}
                  onChange={this.onChangePrefix}
                />
              </div>
              <button
                className="margin"
                style={{
                  cursor: downloading ? "progress" : "pointer",
                }}
                type="button"
                onClick={this.onDownload}
              >
                Download
              </button>
              <progress value={progress} max={100} />
              <div id="png-list" className="flex flex-row" />
            </div>
            <GoogleAds adFormat="auto" adSlot="7887711263" />
          </MainContainer>
        </div>
      </Layout>
    );
  }
}

export default HemodynamicsNotes;

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query GetHemodynamicsNotesQuery {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [fields___date], order: DESC }
      filter: { frontmatter: { template: { eq: "post" } } }
    ) {
      edges {
        node {
          fields {
            slug
            date
          }
          excerpt
          timeToRead
          frontmatter {
            title
            tags
            categories
            date
            cover {
              childImageSharp {
                fluid(maxWidth: 660, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`;

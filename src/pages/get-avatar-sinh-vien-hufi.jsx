import React from "react";
import Helmet from "react-helmet";
import cover from "../../content/images/2020/10/get-avatar-hufi.png";
import config from "../../data/SiteConfig";
import GoogleAds from "../components/GoogleAds";
import MainContainer from "../components/MainContainer/MainContainer";
import Sidebar from "../components/Sidebar/Sidebar";
import Layout from "../layout";
import { getPostList, getTagCategoryList } from "../utils/helpers";

class GetImageHUFI extends React.Component {
  Course = [
    ["02DHTH", 2001110],

    ["03DHTH", 2001120],
    ["03DHQT", 2013120],

    ["04DHTH", 2001130],
    ["04DHQT", 2013130],
    ["04DHDT", 2002130],

    ["05DHTH", 2001140],
    ["05DHQT", 2013140],

    ["06DHTH", 2001150],
    ["06DHKT", 2007150],
    ["06DHNH", 2023150],

    ["07DHTH", 2001160],
    ["07DHDT", 2002160],

    ["08DHTH", 2001170],
    ["08DHQT", 2013170],
    ["08DHNH", 2023170],
    ["08DHDB", 2022170],
    ["08DHKT", 2007170],

    ["09DHTH", 2001180],
    ["09DHKT", 2007180],

    ["10DHTH", 2001190],
    ["11DHTH", 2001200],
    ["11DHDB", 2022202],
    ["11DHKT", 2007206],
  ];

  errorCount = 0;

  constructor(props) {
    super(props);
    this.state = {
      ls: [],
      mssvStart: "2001120",
      numberScan: 100,
      resultCount: 0,
    };
    this.cRef = React.createRef();
  }

  validMSSV = (mssv) => {
    return mssv && mssv.length === 7 && /^[0-9]\d*$/.test(mssv);
  };

  getImage = () => {
    const { numberScan, mssvStart } = this.state;
    if (!this.validMSSV(mssvStart)) {
      alert("Mã khoá không hợp lệ!");
      return;
    }
    if (!(numberScan + 1 > 1)) {
      alert("Số lượng không hợp lệ!");
      return;
    }
    if (numberScan > 2000) {
      alert("Số lượng tối đa là 2000");
      return;
    }
    let c = 0;
    let mssv = Number(`${mssvStart}000`);
    const ls = [];
    while (c < numberScan) {
      ls.push(mssv);

      c += 1;
      mssv += 1;
    }
    this.setState({
      ls,
      resultCount: this.cRef.current.getElementsByClassName("img-ok").length,
    });
  };

  render() {
    const postEdges = this.props.data.allMarkdownRemark.edges;
    const postList = getPostList(postEdges);
    const { tagList, categoryList } = getTagCategoryList(postList);

    const { numberScan, mssvStart, resultCount, ls } = this.state;
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
          <Helmet
            title={`Xem ảnh đại diện sinh viên HUFI - ${config.siteTitle}`}
          >
            <meta
              property="og:title"
              content={`Xem ảnh đại diện sinh viên HUFI - ${config.siteTitle}`}
            />
            <meta
              property="og:description"
              content="Xem ảnh đại diện sinh viên HUFI, Quét toàn bộ ảnh sinh viên HUFI theo khoa."
            />
            <meta name="image" content={cover} />
            <meta property="og:image" content={cover} />
            <meta property="og:type" content="article" />
          </Helmet>
          <MainContainer sidebar={sidebar}>
            <h2>Quét ảnh sinh viên HUFI theo khoá</h2>
            <p>
              Trang này dùng dữ liệu public lấy từ sinhvien.hufi.edu.vn. Mọi
              thắc mắc hay đóng góp ý kiến xin gửi về địa chỉ mail ở trang
              Contact.
            </p>
            <h3>Cách dùng:</h3>
            <p>
              Nếu không tìm thấy khoá học của bạn trong danh sách thì chỉ cần
              nhập 7 số đầu của MSSV.
              <br />
              Vd: MSSV của bạn là 2001200111 thì sẽ nhập là 2001200
            </p>
            <div className="margin-top">
              <select
                onChange={(ev) => {
                  this.setState({
                    mssvStart: ev.currentTarget.value,
                  });
                }}
              >
                {this.Course.map((item) => (
                  <option key={item[0]} value={item[1]}>
                    {item[0]}
                  </option>
                ))}
              </select>
              <div className="flex" style={{ columnGap: 10, rowGap: 0 }}>
                <input
                  style={{ minWidth: 130 }}
                  type="number"
                  value={mssvStart}
                  placeholder="Mã khoá: (7 số đầu của MSSV)"
                  onChange={(ev) => {
                    this.setState({
                      mssvStart: ev.target.value,
                    });
                  }}
                />
                <input
                  value={numberScan}
                  type="number"
                  placeholder="Nhập số lượng hình sẽ quét"
                  min={1}
                  max={2000}
                  onChange={(ev) => {
                    this.setState({
                      numberScan: ev.target.value,
                    });
                  }}
                />

                <button type="button" onClick={this.getImage}>
                  Scan
                </button>
              </div>
              <div
                ref={this.cRef}
                style={{ rowGap: 10 }}
                className="flex flex-row justify-content-space-between"
              >
                {ls.map((mssv) => (
                  <img
                    style={{ display: "none" }}
                    key={mssv}
                    alt="hufi"
                    src={`https://docsv.hufi.edu.vn/GetImage.aspx?MSSV=${mssv}`}
                    width={145}
                    onLoad={(ev) => {
                      const target = ev.currentTarget;
                      target.style = "display: unset";
                      target.className = "img-ok";
                      this.setState({
                        resultCount: this.cRef.current.getElementsByClassName(
                          "img-ok"
                        ).length,
                      });
                      this.errorCount = 0;
                    }}
                    onError={() => {
                      this.setState({
                        resultCount: this.cRef.current.getElementsByClassName(
                          "img-ok"
                        ).length,
                      });
                      this.errorCount += 1;
                      if (this.errorCount > 50) {
                        this.setState({
                          ls: ls.slice(0, ls.indexOf(mssv)),
                        });
                        this.errorCount = 0;
                        alert(`Tìm thấy ${resultCount} sinh viên!`);
                      }
                    }}
                  />
                ))}
              </div>
            </div>
            <GoogleAds adFormat="auto" adSlot="7887711263" />
          </MainContainer>
          {resultCount > 0 ? (
            <div
              className="fload-button"
              style={{
                position: "fixed",
                display: "flex",
                bottom: 20,
                left: 20,
                backgroundColor: "rgba(0, 148, 67, .9)",
                color: "whitesmoke",
                height: 50,
                minWidth: 50,
                padding: 5,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 35,
              }}
            >
              {resultCount}
            </div>
          ) : null}
        </div>
      </Layout>
    );
  }
}

export default GetImageHUFI;

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query GetImageHUFIQuery {
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

import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../layout";
import MainContainer from "../components/MainContainer/MainContainer";
import Sidebar from "../components/Sidebar/Sidebar";
import { getPostList, getTagCategoryList } from "../utils/helpers";
import config from "../../data/SiteConfig";
import GoogleAds from "../components/GoogleAds";
import cover from "../../content/images/2020/10/get-avatar-hufi.png";

class GetImageHUFI extends React.Component {
  Course = [
    ["02DHTH", 2001110000],

    ["03DHTH", 2001120000],
    ["03DHQT", 2013120000],

    ["04DHTH", 2001130000],
    ["04DHQT", 2013130000],
    ["04DHDT", 2002130000],

    ["05DHTH", 2001140000],
    ["05DHQT", 2013140000],

    ["06DHTH", 2001150000],
    ["06DHKT", 2007150000],
    ["06DHNH", 2023150000],

    ["07DHTH", 2001160000],
    ["07DHDT", 2002160000],

    ["08DHTH", 2001170000],
    ["08DHQT", 2013170000],
    ["08DHNH", 2023170000],
    ["08DHDB", 2022170000],
    ["08DHKT", 2007170000],

    ["09DHTH", 2001180000],
    ["09DHKT", 2007180000],

    ["10DHTH", 2001190000],
    ["10DHQTDVNH", 2030190000],

    ["11DHTH", 2001200000],
    ["11DHDB", 2022202000],
    ["11DHKT", 2007206000],
    ["11DHQTDVLH", 2024203000],
  ];

  errorCount = 0;

  constructor(props) {
    super(props);
    this.state = {
      ls: [],
      mssvStart: 2001120000,
      numberScan: 100,
      resultCount: 0,
    };
    this.cRef = React.createRef();
  }

  getImage = () => {
    const { numberScan, mssvStart } = this.state;
    if (!(mssvStart + 1 > 1)) {
      alert("MSSV không hợp lệ!");
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
    let mssv = mssvStart;
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
            <h2>Quét ảnh sinh viên HUFI theo khoa</h2>
            <p>
              Trang này dùng dữ liệu public lấy từ sinhvien.hufi.edu.vn. Mọi
              thắc mắc hay đóng góp ý kiến xin gửi về địa chỉ mail ở trang
              Contact.
            </p>

            <div className="">
              <select
                onChange={(ev) => {
                  this.setState({
                    mssvStart: Number(ev.currentTarget.value),
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
                  placeholder="MSSV bắt đầu"
                  onChange={(ev) => {
                    this.setState({
                      mssvStart: Number(ev.target.value),
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
                    src={`http://docsv.hufi.edu.vn/GetImage.aspx?MSSV=${mssv}`}
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
                        alert("Stopped!");
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

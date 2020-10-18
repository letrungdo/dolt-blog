import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../layout";
import MainContainer from "../components/MainContainer/MainContainer";
import Sidebar from "../components/Sidebar/Sidebar";
import SEO from "../components/SEO/SEO";
import { getPostList, getTagCategoryList } from "../utils/helpers";
import config from "../../data/SiteConfig";

class GetImageHUFI extends React.Component {
  Course = [
    ["03DHTH", 2001120000],
    ["03DHQT", 2013120000],

    ["04DHTH", 2001130000],
    ["04DHQT", 2013130000],
    ["04DHDT", 2002130000],

    ["05DHTH", 2001140000],

    ["06DHTH", 2001150000],
    ["06DHNH", 2023150000],

    ["07DHTH", 2001160000],
    ["07DHDT", 2002160000],

    ["08DHTH", 2001170000],
    ["08DHQT", 2013170000],
    ["08DHNH", 2023170000],
    ["08DHDB", 2022170000],

    ["09DHTH", 2001180000],
    ["09DHKT", 2007181000],

    ["10DHTH", 2001190000],
    ["10DHQTDVNH", 2030190000],

    ["11DHDB", 2022202000],
    ["11DHKT", 2007206000],
    ["11DHQTDVLH", 2024203000],
  ];

  constructor(props) {
    super(props);
    this.state = {
      ls: [],
      mssvStart: 2001120000,
      numberScan: 100,
    };
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
    });
  };

  render() {
    const postEdges = this.props.data.allMarkdownRemark.edges;
    const postList = getPostList(postEdges);
    const { tagList, categoryList } = getTagCategoryList(postList);

    const { numberScan, mssvStart } = this.state;
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
          <Helmet title={config.siteTitle} />
          <SEO />
          <MainContainer sidebar={sidebar}>
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
              {this.state.ls.map((mssv) => (
                <img
                  style={{ display: "none" }}
                  key={mssv}
                  alt="hufi"
                  src={`http://sinhvien.hufi.edu.vn/GetImage.aspx?MSSV=${mssv}`}
                  width={135}
                  height={180}
                  onLoad={(ev) => {
                    const target = ev.currentTarget;
                    target.style = "display: unset";
                  }}
                />
              ))}
            </div>
          </MainContainer>
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

import React from 'react';
import { graphql } from 'gatsby';
import SEO from '../../components/SEO';
import Layout from '../../layouts/index';

const Officers = (props) => {
  const officers = props.data.allMarkdownRemark.edges;
  return (
    <Layout bodyClass="page-officers">
      <SEO title="Officers" />
      <div className="intro">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1>Lodge Officers</h1>
              <p>
                Lodge Officers for the 2019 Masonic Year.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container pb-6">
        <div className="row">
          {officers.map(edge => (
            <div key={edge.node.frontmatter.path} className="col-12 col-md-6 mb-1">
              <div className="team card-two">
                <div className="card-header">
                  <div className="card-header-left">
                    {edge.node.frontmatter.image && (
                      <div className="card-image">
                        <img
                          alt={edge.node.frontmatter.title}
                          className="img-fluid mb-2"
                          src={edge.node.frontmatter.image}
                        />
                      </div>
                    )}
                  </div>
                  <div className="card-right">
                    <h2 className="card-title">{edge.node.frontmatter.title}</h2>
                    <ul className="card-meta">
                      <li>
                        <strong>{edge.node.frontmatter.jobtitle}</strong>
                      </li>
                      <li>
                        <a target="_blank" href={edge.node.frontmatter.linkedinurl}>
                          {edge.node.frontmatter.linkedinurl}
                        </a>
                      </li>
                      <li>
                        <a href={edge.node.frontmatter.email}>{edge.node.frontmatter.email}</a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div
                  className="team-content"
                  dangerouslySetInnerHTML={{ __html: edge.node.html }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query OfficerQuery {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/officers/" } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          html
          frontmatter {
            title
            path
            image
            jobtitle
            email
          }
        }
      }
    }
  }
`;

export default Officers;

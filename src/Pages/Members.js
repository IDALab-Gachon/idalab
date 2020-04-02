import React from 'react';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Media } from 'react-bootstrap';

import jihye_img from '../members_jihye.jpg';
import yeonsun_img from '../members_yeonsun.jpg';

const MemContent = styled.div`
  width: 100%;
  margin-top: 100px;
  text-align: justify;
  padding: 25px;
`;

const MemWrapper = styled.div`
  color: #262626;
  border: 1px solid #e6e6e6;
  border-radius: 4px;
  background-color: #FAFAFA;
  padding: 20px;
  margin: 5px;
`;

const Members = () => {
  return (
    <MemContent>
      <MemWrapper>
        <h2>Professor</h2>
        <br/>
        <ul className = "list-unstyled">
          <Media as="li">
            <img
              width={150}
              height={150}
              className="mr-3"
              src="http://sclab.gachon.ac.kr/wp-content/uploads/2016/02/OkranJeong-150x150.jpg"
              alt="OkRan Jeong"
            />
            <Media.Body>
              <h5>OkRan Jeong</h5>
              <p>Associate Professor <br/> Dept. of Software, Gachon University</p>
              <p>Email: orjeong@gachon.ac.kr</p>
            </Media.Body>
          </Media>
        </ul>
      </MemWrapper>
      <MemWrapper>
        <h2>Ph.D. Student</h2>
        <br/>
        <ul className="list-unstyled">
          <Media as="li">
            <img
              width={150}
              height={150}
              className="mr-3"
              src="http://sclab.gachon.ac.kr/wp-content/uploads/2016/02/so_yeop_yoo-150x150.jpg"
              alt="SoYeop Yoo"
            />
            <Media.Body>
              <h5>SoYeop Yoo</h5>
              <p>Email: bbusso90@gmail.com</p>
            </Media.Body>
          </Media>
        </ul>
      </MemWrapper>
      <MemWrapper>
        <h2>M.S. Students</h2>
        <br/>
        <ul className="list-unstyled">
          <Media as="li">
            <img
              width={150}
              height={200}
              className="mr-3"
              src={jihye_img}
              alt="JiHye Kim"
            />
            <Media.Body>
              <h5>JiHye Kim</h5>
              <p>Email: kimjihae28@naver.com</p>
            </Media.Body>
          </Media>
          <br/>
          <Media as="li">
            <img
              width={150}
              height={200}
              className="mr-3"
              src={yeonsun_img}
              alt="YeonSun Ahn"
            />
            <Media.Body>
              <h5>YeonSun Ahn</h5>
              <p>Email: yeonsun0517@gmail.com</p>
            </Media.Body>
          </Media>
        </ul>
      </MemWrapper>   
    </MemContent>
  );  
};

export default Members;
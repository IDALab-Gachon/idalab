import React from "react";
import styled from "styled-components";

const PubContainer = styled.div`
  width: 100%;
  margin-top: 5px;
  text-align: justify;
`;

const PubTitle = styled.div`
  border-bottom: 2px solid ${(props) => props.theme.redColor};
`;

const TitleText = styled.p`
  font-size: 24px;
  font-weight: 600;
  color: ${(props) => props.theme.redColor};
  padding: 10px;
`;

const ListContainer = styled.div`
  width: 100%;
  margin-top: 10px;
  padding: 10px;
`;

const ListTitle = styled.p`
  font-size: 20px;
  font-weight: 600;
  color: ${(props) => props.theme.darkBlueColor};
  padding-bottom: 10px;
  padding-top: 5px;
`;

const PubList = styled.ul`
  list-style: circle;
  color: ${(props) => props.theme.darkGreyColor};
  padding-left: 1em;
`;

const PubListItem = styled.li`
  ::before {
    content: "‣";
    color: ${(props) => props.theme.redColor};
    display: inline-block;
    width: 0.7em;
  }
`;

const Publications = () => {
  return (
    <PubContainer>
      <PubTitle>
        <TitleText>PUBLICATIONS</TitleText>
      </PubTitle>
      <ListContainer>
        <a href="#int_journals_sci" target="_self" rel="noopener noreferrer">
          International Journals(SCI(E), SCOPUS)
        </a>{" "}
        /{" "}
        <a href="#int_conf" target="_self" rel="noopener noreferrer">
          International Journals & Conferences
        </a>{" "}
        /{" "}
        <a href="#kor_journals" target="_self" rel="noopener noreferrer">
          Korean Journals
        </a>{" "}
        /{" "}
        <a href="#kor_conf" target="_self" rel="noopener noreferrer">
          Korean Conferences
        </a>
        <br />
        <br />
        <div id="int_journals_sci">
          <ListTitle>International Journals (SCI(E), SCOPUS)</ListTitle>
          <PubList>
            <PubListItem>
              “MedSumGraph: enhancing GraphRAG for medical QA with summarization and optimized prompts” under review
            </PubListItem>
            <PubListItem>
              “AbuseChat: a knowledge-based abusive chatbot system for evaluating the abusiveness of generative AI,” under revision
            </PubListItem>
            <PubListItem>
              “Target-guided Dialog Generation with Dynamic Knowledge Path by Commonsens Knowledge Graph and Relation Prediction,” under revision
            </PubListItem>
            <PubListItem>
              ChaeLim Park, HaYeong Lee, SeonghHee Lee, Ok-Ran Jeong,
              "Synergistic Joint Model of Knowledge Graph and LLM for Enhancing XAI-Based Clinical Decision Support Systems",
              Mathematics, 2025. (SCIE,{" "}
                <b>Impact Factor: 2.3</b>, JCR 2023)
            </PubListItem>
            <PubListItem>
              HyoJin Ko, Joon Yoo, Ok-Ran Jeong,
              "MDCKE: A multimodal deep-context knowledge extractor that integrates contextual information,",
              Alexandria Engineering Journal, 2025. (SCIE,{" "}
                <b>Impact Factor: 6.2</b>, JCR 2023)
            </PubListItem>
            <PubListItem>
              MinJi Kim, Joon Yoo, Ok-Ran Jeong,
              "MeDi-TODER: Medical Domain-Incremental Task-Oriented Dialogue Generator using Experience Replay,", 
              Expert Systems, 2024. (SCIE,{" "}
                <b>Impact Factor: 3.0</b>, JCR 2023)
            </PubListItem>
            <PubListItem>
              SeYoung Kim, DaeHo Kim, MinJi Kim, HyoJin Ko, and Ok-Ran Jeong,
              "XAI-Based Clinical Decision Support Systems: A Systematic
              Review", Applied Sciences, Vol. 14, 2024. (SCIE,{" "}
              <b>Impact Factor: 2.5</b>, JCR 2023)
            </PubListItem>
            <PubListItem>
              ChaeLim Park, HaYoung Lee, and Ok-Ran Jeong, "Leveraging Medical
              Knowledge Graphs and Large Language Models for Enhanced Mental
              Disorder Information Extraction", Future Internet, Vol. 16, 2024.
              (ESCI, <b>Impact Factor: 2.8</b>, JCR 2023)
            </PubListItem>
            <PubListItem>
              SoYeop Yoo, HaYeong Lee, JeIn Song, and Ok-Ran Jeong, "A Korean
              emotion-factor dataset for extracting emotion and factors in
              Korean conversations ", Scientific Reports, Vol. 13, 2023. (SCIE,{" "}
              <b>Impact Factor: 4.6</b>, JCR 2022)
            </PubListItem>
            <PubListItem>
              Prince Waqas Khan, Yung Cheol Byun, and Ok-Ran Jeong, “A Stacking
              Ensemble Classifier-Based Machine Learning Model for Classifying
              Pollution Sources on Photovoltaic Panels,” Scientific Reports,
              Vol. 13(1), 2023. (SCIE, <b>Impact Factor: 4.6</b>, JCR 2022)
            </PubListItem>
            <PubListItem>
              SoYeop Yoo and Ok-Ran Jeong, “A Token Classification-Based
              Attention Model for Extracting Multiple Emotion–Cause Pairs in
              Conversations,” Sensors, Vol. 23, No. 6, 2023 (SCIE,{" "}
              <b>Impact Factor: 3.9</b>, JCR 2022)
            </PubListItem>
            <PubListItem>
              Hayoung Lee and Ok-Ran Jeong, “A Knowledge-Grounded Task-Oriented
              Dialogue System with Hierarchical Structure for Enhancing
              Knowledge Selection,” Sensors, Vol. 23, No. 2, 2023 (SCIE,{" "}
              <b>Impact Factor: 3.9</b>, JCR 2022)
            </PubListItem>
            <PubListItem>
              YeonSun Ahn, SoYeop Yoo, and OkRan Jeong, "PolarisX2: Auto-Growing
              Context-Aware Knowledge Graph ," International Journal of Web and
              Grid Services, Vol. 19, No. 2, 2023.
            </PubListItem>
            <PubListItem>
              HaYoung Lee, and OkRan Jeong, "Sentiment Analysis and Counseling
              for COVID-19 Pandemic based on Social Media," International
              Journal of Web and Grid Services, Vol. 19, No. 1, 2023.
            </PubListItem>
            <PubListItem>
              Jihye Kim, and Ok-Ran Jeong “Mirroring Vector Space Embedding for
              New Words,” IEEE Access, Vol.9, 2021. (SCIE,{" "}
              <b>Impact Factor: 3.367</b>)
            </PubListItem>
            <PubListItem>
              Shah, A.M, Naqvi, R.A, and Ok-Ran Jeong “Detecting Topic and
              Sentiment Trends in Physician Rating Websites: Analysis of Online
              Reviews Using 3-Wave Datasets,” International Journal of
              Environmental Research and Public, Vol.18(9), 2021. (SSCI,{" "}
              <b>Impact Factor: 2.849</b>)
            </PubListItem>
            <PubListItem>
              Shah, A.M, Naqvi, R.A, and Ok-Ran Jeong “The Impact of Signals
              Transmission on Patients' Choice through E-Consultation Websites:
              An Econometric Analysis of Secondary Datasets,” International
              Journal of Environmental Research and Public, Vol.18(10), 2021.
              (SSCI, <b>Impact Factor: 2.849</b>)
            </PubListItem>
            <PubListItem>
              SoYeop Yoo, and OkRan Jeong, "EP-Bot: Empathetic Chatbot using
              Auto-growing Knowledge Graph," CMC-Computers, Materials, &
              Continua, Vol. 67, No. 3, pp.2807-2817, 2021. (SCIE,{" "}
              <b>Impact Factor: 4.89</b>)
            </PubListItem>
            <PubListItem>
              YeonSun Ahn, and OkRan Jeong, "Time-Aware PolarisX: Auto-Growing
              Knowledge Graph," CMC-Computers, Materials, & Continua, Vol. 67,
              No. 3, pp.2695-2708, 2021. (SCIE, <b>Impact Factor: 4.89</b>)
            </PubListItem>
            <PubListItem>
              SungMin Yang, SoYeop Yoo, and OkRan Jeong, "DeNERT-KG: Named
              Entity and Relation Extraction Model Using DQN, Knowledge Graph,
              and BERT," Applied Sciences, Vol. 10, No. 8, 2020. (SCIE,{" "}
              <b>Impact Factor: 2.7</b>, JCR 2022)
            </PubListItem>
            <PubListItem>
              SoYeop Yoo, and Ok-Ran Jeong, "Automating the Expansion of a
              Knowledge Graph," Expert Systems with Applications, Vol. 141,
              2020. (SCIE, <b>Impact Factor: 8.5</b>, JCR 2022)
            </PubListItem>
            <PubListItem>
              DaeHo Kim and OkRan Jeong, "Cooperative Trafffic Signal Control
              with Traffic Flow Prediction in Multi-Intersection," Sensors, Vol.
              20, No. 1, Jan. 2020 (SCIE, <b>Impact Factor: 3.275</b>)
            </PubListItem>
            <PubListItem>
              SoYeop Yoo, DaeHo Kim, SungMin Yang, and Ok-Ran Jeong, "Real-time
              disease detection and analysis system using social media
              contents," Internation Journal of Web and Grid Services, 2020.
              (SCIE, <b>Impact Factor: 2.750</b>)
            </PubListItem>
            <PubListItem>
              DaeHo Kim, JiHye Kim and OkRan Jeong, “A Study on the Traffic
              Signal Control using the Extended Deep Q Network,” ICIC Express
              Letters Part B: Applications, 2020. (SCOPUS)
            </PubListItem>
            <PubListItem>
              SungMin Yang, SoYeop Yoo, YeonSun Ahn, and OkRan Jeong,
              "Person-Relation Extraction using BERT based Knowledge Graph,"
              ICIC Express Letters Part B: Applications, Vol. 11, No. 6, 2020.
              (SCOPUS)
            </PubListItem>
            <PubListItem>
              SoYeop Yoo and OkRan Jeong, "Auto-growing Knowledge Graph-based
              Intelligent Chatbot using BERT," ICIC Express Letters, Vol. 14,
              No. 1, pp. 67-73, Jan 2020. (SCOPUS)
            </PubListItem>
            <PubListItem>
              SoYeop Yoo, JeIn Song, and Ok-Ran Jeong, “Social media contents
              based sentiment analysis and prediction system,” Expert Systems
              with Applications, Vol. 105, pp. 102-111, 2018. (SCIE,{" "}
              <b>Impact Factor: 3.928</b>)
            </PubListItem>
            <PubListItem>
              Won&nbsp;Kim, Ok-Ran Jeong&nbsp;&nbsp;"Online and Mobile Korea:
              Status and Challenges,"&nbsp; International Journal of Web and
              Grid Service, Vol. 12, No. 4, pp. 370-387, 2016.
            </PubListItem>
            <PubListItem>
              Won Kim, Jaehyuk Choi,&nbsp;Ok-Ran Jeong,&nbsp;Woo-Jin Han,
              &nbsp;Chulyun Kim and&nbsp;Woon-Kee Loh, "On&nbsp;the Internet of
              Things," International Journal of Web and Grid Service, Vol. 11,
              No. 4,&nbsp;Dec. 2015
            </PubListItem>
            <PubListItem>
              Ok-Ran Jeong, " SNS-based recommendation mechanisms for social
              media," Multimedia Tools and Applications, Vol. 74(7), April, 2015
            </PubListItem>
          </PubList>
          <details>
            <summary>More international journals (SCI(E)) before 2015</summary>
            <PubList>
              <PubListItem>
                Won Kim, Ok-Ran Jeong and&nbsp;Chulyun Kim, "A Holistic View of
                Big Data," International Journal of Data Warehousing and Mining,
                Vol. 10(3), July, 2014
              </PubListItem>
              <PubListItem>
                Ok-Ran Jeong, Jehwan Oh, Dong-Jin Kim, Heetae Lyu and
                Won&nbsp;Kim, "Determining the titles of Web pages using anchor
                text and link analysis," Expert Systems with Applications, Vol
                41, July, 2014
              </PubListItem>
              <PubListItem>
                Jaehyuk Choi,&nbsp;Ok-Ran Jeong,&nbsp;Woo-Jin Han, &nbsp;Chulyun
                Kim and Won&nbsp;Kim, "On cyberattack mechanisms," International
                Journal of Web and Grid Service, Vol. 9, No. 4,&nbsp;Dec. 2013
              </PubListItem>
              <PubListItem>
                Chulyun Kim, Ok-Ran Jeong, Jaehyuk Choi and Won&nbsp;Kim, "
                E-books on the mobile e-reader,"&nbsp;&nbsp;Mobile Information
                Systems, Vol. 9, No. 1,&nbsp;January 2013
              </PubListItem>
              <PubListItem>
                Ok-Ran Jeong, Won&nbsp;Kim, " A Paragraph-Inserted Word Salad
                Fitlering Algorithm,"&nbsp;&nbsp;International Journal of Web
                and Grid Service, Vol. 8, No. 1, March 2012
              </PubListItem>
              <PubListItem>
                Jehwan Oh,&nbsp;Ok-Ran Jeong, Eunseok Lee, Won Kim, &nbsp;"A
                Framework for Collective Intelligence from Internet Q&amp;A
                Documents," &nbsp;International Journal of Web and Grid Service,
                Vol. 7, No. 2, May 2011
              </PubListItem>
              <PubListItem>
                Won Kim,&nbsp;Ok-Ran Jeong, Chulyun Kim, Jungmin So, "The Dark
                Side of the Internet: Attacks, Costs and Responses," Information
                Systems, Vol. 36, No. 3, May 2011.
              </PubListItem>
              <PubListItem>
                Ok-Ran Jeong, Won Kim, Bu-Yong Um, Joon-Gil Kwon, Sung-hyun
                Park, "&nbsp;A word-salad filtering algorithm," LOGIC JOURNAL of
                the IGPL, Oxford University Press, May, 2010.
              </PubListItem>
              <PubListItem>
                Won Kim,&nbsp;Ok-Ran Jeong, Sang-Won Lee, "On Social Web Sites",
                Information Systems: An International Journal, Elsevier Press,
                Sep, 2009.
              </PubListItem>
            </PubList>
            <span>
              -{" "}
              <a href="http://sw.gachon.ac.kr/orjeong/news2_link%202.jpg">
                <em>Information Systems Journal most downloaded #1</em>
              </a>
            </span>

            <span>
              -&nbsp;
              <a href="http://sw.gachon.ac.kr/orjeong/news2_link%201.jpg">
                <em>
                  ScienceDirect 25 hottest articles (computer science) most
                  downloaded #16
                </em>
              </a>
            </span>
            <PubList>
              <PubListItem>
                Ok-Ran Jeong, Eunseok Lee, Won Kim, "Refining search results
                using a mining framework", Expert Systems with Applications ,
                36(2009),&nbsp;&nbsp;pp. 11204 – 11210, Elsevier Press, May,
                2009.
              </PubListItem>
              <PubListItem>
                Dongjoo Lee, Taehee Lee, Suekyung Lee,&nbsp;Ok-Ran Jeong,
                Hyeonsang Eom, Sang-goo Lee, "Best Choice: A Decision Support
                System for Supplier Sélection in e-Marketplaces", Data
                Engineering Issues in E-Commerce and Services, Volume LNCS 4015,
                Springer Verlag, pp.198-208, September, 2006, San Francisco, CA,
                USA.
              </PubListItem>
              <PubListItem>
                Ok-Ran Jeong, Dong-Sub Cho, "&nbsp;A Three-step Preprocessing
                Algorithm for minimizing E-mail Document's atypical
                characteristics", The Second International Conference on Fuzzy
                Systems and Knowledge Discovery (FSKD'05),Volume LNAI 3614,
                Springer Verlag, pp.791-798 August 2005. Changsha, China.
              </PubListItem>
              <PubListItem>
                Ok-Ran Jeong,&nbsp;Dong-Sub Cho, "Component-based Recommendation
                Agent System for Efficient E-Mail Inbox Management",
                Computational and Information Science (CIS'04), Volume LNCS
                3314, Springer Verlag, pp.791-798, December 2004, Shanghai,
                China.
              </PubListItem>
              <PubListItem>
                Ok-Ran Jeong,&nbsp;Dong-Sub Cho, "A Rule Filtering Component
                based on Recommendation Agent System for Classifying Email
                Document", Parallel and Distributed Computing: Applications and
                Technologies (PDCAT'04), Volume LNCS 3320, Springer Verlag, pp.
                697-703, December 2004,Singapore.
              </PubListItem>
              <PubListItem>
                Ok-Ran Jeong,&nbsp;Dong-Sub Cho, "A Personalized Recommendation
                Agent System for E-Mail Document Classification", Computational
                Science and Its Applications (ICCSA 2004), Volume LNCS 3045,
                Springer Verlag, pp.558-565, May 2004, Assisi, Italy.
                <em>
                  <span>
                    *&nbsp;LNCS and LNAI&nbsp;were recognized as SCIE journal
                    until December, 2006
                  </span>
                </em>
              </PubListItem>
            </PubList>
          </details>
        </div>
        <hr />
        <div id="int_conf">
          <ListTitle>International Journals & Conferences</ListTitle>
          <PubList>
            <PubListItem>
              SoYeop Yoo and OkRan Jeong, "Auto-growing Knowledge Graph-based
              Intelligent Chatbot using BERT," 14th International Conference on
              Innovative Computing, Information and Control (ICICIC2019), 2019.
            </PubListItem>
            <PubListItem>
              DaeHo Kim, JiHye Kim and OkRan Jeong, "A Study on the Traffic
              Signal Control using the Extended Deep Q Network," 14th
              International Conference on Innovative Computing, Information and
              Control (ICICIC2019), 2019.
            </PubListItem>
            <PubListItem>
              SungMing Yang, SoYeop Yoo, YeonSun Ahn and OkRan Jeong,
              "Person-Relation Extraction using BERT based Knowledge Graph,"
              14th International Conference on Innovative Computing, Information
              and Control (ICICIC2019), 2019.
            </PubListItem>
            <PubListItem>
              DaeHo, Kim., Sungmin, Yang., and OkRan, Jeong., “A Scalable Big
              Data Architecture in various Cyber-Physical Systems,” ICCE-ASIA,
              2018.
            </PubListItem>
            <PubListItem>
              Won, Kim., AhYong, Choi., JaeHyuk, Choi., OkRan, Jeong., et al.,
              “Korea’s software education initiative,” In proceedings of the 19
              <sup>th</sup> International Conference on Information Integration
              and Web-based Applications &amp; Services, pp.553-557, ACM, 2017.
            </PubListItem>
            <PubListItem>
              SoYeop, Yoo., JungHoon, Jang., and OkRan, Jeong., “Mechanism
              Design for ConceptNet Localization,” The 9th International
              Conference on Internet (ICONI), KSII, 2017.
            </PubListItem>
            <PubListItem>
              DaeHo, Kim., JungHoon, Jang., and OkRan, Jeong., “A Social Web
              Crawler using ConceptNet,” The 9th International Conference on
              Internet (ICONI), KSII, 2017.
            </PubListItem>
            <PubListItem>
              JeIn, Song., JungHoon, Jang., and OkRan, Jeong., “Semantic
              Extraction Model based on Knowledge Graph,” The 9th International
              Conference on Internet (ICONI), KSII, 2017.
            </PubListItem>
            <PubListItem>
              SoYeop, Yoo., and OkRan, Jeong., “Personalized Social Search based
              on User Context Analysis”, 7th International Conference on
              Emerging Databases, KIISE, 2017.
            </PubListItem>
            <PubListItem>
              SoYeop, Yoo., JeIn, Song., and OkRan, Jeong., “An Intuitivie and
              Efficient Web Console for AsterixDB”, 7th International Conference
              on Emerging Databases, KIISE, 2017.
            </PubListItem>
            <PubListItem>
              DaeHo, Kim., JeIn, Song., SoYeop, Yoo., and OkRan, Jeong.,
              “Personalized Travel Recommendation with Social Trends and
              Initimacy,” The 12<sup>th</sup> Asia Pacific International
              Conference on Information Science and Technology (APIC-IST), 2017.
            </PubListItem>
            <PubListItem>
              SoYeop, Yoo., TaeSoo, Park., JeIn, Song., and OkRan, Jeong., “A
              Trajectory Analysis System for Social Media Contents using
              AsterixDB”, 11th International Conference on Ubiquitous
              Information Management and Communication, ACM, 2017.
            </PubListItem>
          </PubList>
          <details>
            <summary>More international conferences before 2015</summary>
            <PubList>
              <PubListItem>
                So-Yeop Yoo, Ok-Ran Jeong, " SNS based Recommendation
                Algorithm,"&nbsp;&nbsp;International Conference on Information
                Science and Applications (ICISA 2013), Jun, 2013, Thailand
              </PubListItem>
              <PubListItem>
                Soo-Jeong Choi, Ok-Ran Jeong, " SNS Information Extraction for
                Social Search,"&nbsp; International Conference on Information
                Science and Applications (ICISA 2013), Jun, 2013, Thailand
              </PubListItem>
              <PubListItem>
                Chon-Jae Yoo, Ok-Ran Jeong, " Category Extraction for Multimedia
                File Search,"&nbsp;&nbsp; International Conference on
                Information Science and Applications (ICISA 2013), Jun, 2013,
                Thailand
              </PubListItem>
              <PubListItem>
                Jehwan Oh, Ok-Ran Jeong, Eunseok Lee, "Collective Intelligence
                based Place Recommendation System "ICAIT'12 (International
                Conference on Advanced Infocomm technology)" LNCS 7593, July,
                2012, Paris, France
              </PubListItem>
              <PubListItem>
                Ok-Ran Jeong,&nbsp;Jiawei Han, Won Kim, Eunseok Lee, "On Having
                Search Engines Deliver Hierarchies of Web Pages", Journal of
                Object Technology, Vol.7, No. 4, pp.33-41, May-June 2008
              </PubListItem>
              <PubListItem>
                Ok-Ran Jeong, Jehwan Oh, "Social Community Based Blog Search
                Framework" SNSM 2012 (Third international Workshop on Social
                Networks and Social Web Mining) LNCS 7240, April, 2012, Busan,
                Korea
              </PubListItem>
              <PubListItem>
                Ok-Ran Jeong,&nbsp;&nbsp;Jehwan Oh, "Social community Based Blog
                Search Framework", Database Systems for Advanced Applications,
                LNCS 7240, April,&nbsp;2012
              </PubListItem>
              <PubListItem>
                Ok-Ran Jeong,&nbsp;&nbsp;chulyun Kim, Won Kim, Jungmin So,
                "Botnets: threats and response", International Journal of Web
                Information Systems, Vol.7, No. 1, pp.6-17, &nbsp;April, 2011
              </PubListItem>
              <PubListItem>
                Won Kim,&nbsp;Ok-Ran Jeong, Chulyun Kim, Jungmin So, "On
                Botnets," iiWAS 2010(International Conference on Information
                Integration Web-Based Applications &amp; Services), Nov. 2010,
                Paris, France
              </PubListItem>
              <PubListItem>
                Jehwan Oh, Ok-Ran Jeong, Eunseok Lee, "A Personalized
                Recommendation System Based on Product Attribute-specific
                Weights and Improved User Behavior Analysis",
                ICUIMC2010(International Conference on Ubiquitous Information
                Management andCommunication), Jan. 2010, Suwon, Kore [ACM
                Co-sponsored]
              </PubListItem>
              <PubListItem>
                Won Kim, Ok-Ran Jeong, "On Leaveraging Social Web
                Sites",&nbsp;ICICIC2009(the 4<sup>th</sup>&nbsp;International
                Conference on Innovative Computing, Information and Control),
                Dec. 2009, Kaohsiung, Taiwan
              </PubListItem>
              <PubListItem>
                Won Kim, Ok-Ran Jeong, "On Social E-learning",&nbsp;ICWL2009(the
                8<sup>th</sup>&nbsp;International Conference on Web base
                Learning), Aug. 2009, Aachen, Germany
              </PubListItem>
              <PubListItem>
                Ok-Ran Jeong,&nbsp;Taehee Lee, Sang-goo Lee, "Optimizing the
                pre-processing phase of Automatic e-Document
                Classification",Studies in Computational Intelligence (Academic
                Book), Springer-Verlag, 2009
              </PubListItem>

              <PubListItem>
                Ok-Ran Jeong, Seunghwa Lee, Eunseok Lee, "A Framework for
                Automatic Topic Discovery on SubWebs", &nbsp;FSKD'08( the 5
                <sup>th</sup>&nbsp;International Conference on Fuzzy Systems and
                Knowledge Discovery), Oct. 2008, Jinan, China [in cooperation
                with IEEE Computer Society]
              </PubListItem>
              <PubListItem>
                Won Kim,&nbsp;Ok-Ran Jeong, "On Properly Using Technologies to
                Make E-Learning Effctive", ICWL2008(the 7<sup>th</sup>{" "}
                International Conference on Web base Learning), Aug. 2008,
                Jinhua, China.
              </PubListItem>
              <PubListItem>
                Won Kim, Ok-Ran Jeong, Hyungsuk Ji, Sang-Won Lee, "On Web
                Search: Some Activities and Challenges", Journal of Object
                Technology, Vol. 7, No. 3, pp.49-54, March-April 2008
              </PubListItem>

              <PubListItem>
                Dongjoo Lee,&nbsp;Ok-Ran Jeong, Sang-goo Lee, "Opinion Mining of
                Customer Feedback Data on the Web", ICUIMC2008(International
                Conference on Ubiquitous Information Management and
                Communication), Jan. 2008,&nbsp;Suwon, Korea [ACM Co-sponsored]
              </PubListItem>
              <PubListItem>
                Chulki Lee, SungchanPark, Dongjoo Lee, Jae-won Lee,&nbsp;Ok-Ran
                Jeong, Sang-goo Lee, "A Comparison of Ontology Reasoning Systems
                Using Query Sequences", ICUIMC2008(International Conference on
                Ubiquitous Information Management and Communication), Jan.2008,
                Suwon, Korea [ACM Co-sponsored]
              </PubListItem>
              <PubListItem>
                Jae-won Lee, Taehee Lee, Sang-keun Lee,&nbsp;Ok-Ran Jeong,
                Sang-goo Lee, "Massive Catalog Index based Search&nbsp;for
                e-Catalog Matching", IEEE Joint Conference on E-Commerce
                Technology (CEC) and Enterprise Computing,&nbsp;E-Commerce and
                E-Services (EEE), July 2007, Tokyo, Japan
              </PubListItem>
              <PubListItem>
                Jung-Yeon Yang, Ik-Hoon Lee,&nbsp;Ok-Ran Jeong, Jun-Young Song,
                Chul-Min Lee, Sang-goo Lee, "Architecture for&nbsp;Supporting
                Batch Query and Online Service against Very Large DB System",
                IEEE ICEBE (International&nbsp;Conference on e-Business
                Engineering), October 2006, Shanghai, China.
              </PubListItem>
              <PubListItem>
                Jung-Yeon Yang, Ik-Hoon Lee,&nbsp;Ok-Ran Jeong, Jun-Young Song,
                Chul-Min Lee, Sang-goo Lee, Architecture for&nbsp;Supporting
                Batch Query and Online Service against Very Large DB System",
                IEEE ICEBE (International Conference on e-Business Engineering),
                October 2006, Shanghai, China.
              </PubListItem>
              <PubListItem>
                Ok-Ran Jeong, Taehee Lee, Sang-goo Lee, "Optimizing the
                pre-processing phase in Automatic
                e-Document&nbsp;Classification", IEEE PRIWEC (The First Pacific
                Rim International Workshop on Electronic Commerce),
                March&nbsp;2006, Tokyo, Japan.
              </PubListItem>
              <PubListItem>
                Ok-Ran Jeong,&nbsp;Dong-Sub Cho, "Preprocessing Algorithm for
                the Efficient Management of E-Mail System",&nbsp;International
                Journal of Computer and Information Science, Volume 5, number 4,
                DEC. 2004. [INSPEC]
              </PubListItem>
              <PubListItem>
                Ok-Ran Jeong,&nbsp;Dong-Sub Cho, "A Personalized Recommendation
                Agent System using an IRuleFilter&nbsp;Component", The 3
                <sup>rd</sup>&nbsp;ACIS International Conference on Computer and
                Information Science (ICIS 2004),&nbsp;pp. 208-213, Los Angeles,
                CA, USA, August 18-19 2004.
              </PubListItem>
              <PubListItem>
                Ok-Ran Jeong,&nbsp;Dong-Sub Cho, "Personalized Filtering Agent
                for E-Mail Classification", The International&nbsp;Conference on
                Security and Management (SAM'03), Volume I, pp.274-280, Las
                Vegas, Nevada, USA, June 2003.
              </PubListItem>
              <PubListItem>
                Su-Hong Min, Ok-Ran Jeong, Dong-Sub Cho, "A Web-based Login
                System using the Time Based Password&nbsp;(TBP)", The
                International Conference on Security and Management (SAM'03),
                Volume II, pp.415-420,&nbsp;Las Vegas, Nevada, June 2003.
              </PubListItem>
              <PubListItem>
                Yeun-Jung Kim,&nbsp;Ok-Ran Jeong, Dong-Sub Cho, "Design and
                Implementation of the multi-threaded game server&nbsp;using
                telnet", 2003 International Conference on Multimedia Technology
                and Its Applications, pp.229-233, Agr,&nbsp;Uttar Pradesh,
                India, January 2003.
              </PubListItem>
              <PubListItem>
                Ok-Ran Jeong,&nbsp;Dong-Sub Cho, "Design of Filtering Agent
                Interface using XML E-Mail system", The 2<sup>nd</sup>
                &nbsp;Asia&nbsp;Pacific International Symposium on Information
                Technology(APIS II), pp.18-22, Jakarta, Indonesia,
                December,&nbsp;2002.
              </PubListItem>
              <PubListItem>
                Ok-Ran Jeong, Dong-Sub Cho, "An Efficient Mail Delivery System
                with Predefined Mail Template in mail&nbsp;client",
                International Conference on Electrical Engineering 2002
                (ICEE2002), Vol.IV, pp.2009-2012, Jeju Island,&nbsp;Korea, July
                2002.
              </PubListItem>
            </PubList>
          </details>
        </div>
        <hr />
        <div id="kor_journals">
          <ListTitle>Korean Journals</ListTitle>
          <PubList>
            <PubListItem>
              Tae-Hyeong Kwon, Dae-Ho Kim, Se-Young Kim and OkRan Jeong, "Improving Deep Learning Performance on Imbalanced Medical Data 
Using Natural Language Data Augmentation Technique", Journal of
              The Korea Society of Computer and information, Vol.24(1), 2025.
            </PubListItem>
            <PubListItem>
              Dong-Hyeon Kim, Dae-Ho Kim, Se-Young Kim and OkRan Jeong, "Deep Learning based Automatic ICD Coding for Nursing Surveillance of Abdominal Surgery Patients", Journal of
              The Korea Society of Computer and information, Vol.24(1), 2025.
            </PubListItem>
            <PubListItem>
              ChaeLim Park, SoYeop Yoo, and OkRan Jeong, "A Study on
              Conversational AI Agent based on Continual Learning", Journal of
              The Korea Society of Computer and information, Vol.28(1), 2023.
            </PubListItem>
            <PubListItem>
              DooWon Kang, SoYeop Yoo, HaYoung Lee and OkRan Jeong, "A study on
              Deep Learning-based Stock Price Prediction using News Sentiment
              Analysis", Journal of The Korea Society of Computer and
              information, Vol.27(8), 2022.
            </PubListItem>
            <PubListItem>
              Ha-Young Lee, and Ok-Ran Jeong, "A personalized exercise
              recommendation system using dimension reduction algorithms,"
              Journal of The Korea Society of Computer and information, Vol.
              26(6), 2021.
            </PubListItem>
            <PubListItem>
              Se-Hun An, and Ok-Ran Jeong, "A Study on the Psychological
              Counseling AI Chatbot System based on Sentiment Analysis," Journal
              of Information Technology, Vol. 20(3), 2021.
            </PubListItem>
            <PubListItem>
              SoYeop Yoo and OkRan Jeong, "Korean Contextual Information
              Extraction System using BERT and Knowledge Graph," Journal of
              Internet Computing and Services(JICS), Vol. 21, No. 3, pp.
              123-131, 2020.
            </PubListItem>
            <PubListItem>
              SungMin Yang and OkRan Jeong, "DeNERT: Named Entity Recognition
              Model using DQN and BERT," Journal of the Korea Society of
              Computer and Information(JKSCI), Vol. 25, No. 4, pp. 29-35, 2020.
            </PubListItem>
            <PubListItem>
              JiHye Kim and OkRan Jeong, "Knowledge Graph-based Korean New Words
              Detection Mechanism for Spam Filtering," Journal of Internet
              Computing and Services(JICS), Vol. 21, No. 1, pp. 79-85, 2020.
            </PubListItem>
            <PubListItem>
              DaeHo, Kim., and OkRan, Jeong., “A Study on Cooperative Traffic
              Signal Control at multi-intersection,” Journal of IKEEE, Vol. 23,
              No. 4, pp.1381-1386, 2019.
            </PubListItem>
            <PubListItem>
              YeonSun, Ahn., and OkRan, Jeong., “A Method for Spam Message
              Filtering Based on Lifelong Machine Learning,” Journal of IKEEE,
              Vol. 23, No. 4, pp. 1393-1399, 2019.
            </PubListItem>
            <PubListItem>
              SoYeop Yoo and OkRan Jeong, "An Intelligent Chatbot Utilizing BERT
              Model and Knowledge Graph," Journal of Society for e-Business
              Studies, Vol. 24, No. 3, pp. 87-98, 2019.
            </PubListItem>
            <PubListItem>
              DaoHo, Kim., JeIn, Song., SoYeop, Yoo., and OkRan, Jeong., “A
              Social Travel Recommendation System using Item-based Collaborative
              Filtering,” Journal of Internet Computing and Services, Vol. 19,
              No. 3, 2018.
            </PubListItem>
            <PubListItem>
              Gyeong-don Joo, Chulyun Kim and OkRan Jeong, “A Study on Training
              Set Selection Techniques for Efficient Deep Learning,” Database
              Research, Vol. 33, No. 1, pp.37-47, 2017.
            </PubListItem>
            <PubListItem>
              JeIn, Song., and OkRan, Jeong., “Tag based Web Resource
              Recommendation System,” Journal of Korean Society for Internet
              Information, Vol. 17, No. 6, pp.133-141, 2016.
            </PubListItem>
            <PubListItem>
              <span>
                TaeSoo, Park., and OkRan, Jeong., “Event Detection System using
                Twitter Data,” Journal of Korean Society for Internet
                Information, Vol. 17, No. 6, pp.153-158, 2016.
              </span>
            </PubListItem>
            <PubListItem>
              Taesoo Park, Ok-Ran Jeong, " Socal Network based Music
              Recommendation System," Journal of Korean Society for Internet
              Information, Vol. 16, No. 6, pp.133-142, Dec. 2015.
            </PubListItem>
            <PubListItem>
              So-Yeop Yoo, Ok-Ran Jeong, " The YouTube Video Recommendation
              Algorithm using Users' Social Category", Journal of KIISE(Korean
              Institute of Information Scientist and Engineers), Vol 42, No. 5,
              May, 2015.
            </PubListItem>
          </PubList>
          <details>
            <summary>More Korean journals before 2015</summary>
            <PubList>
              <PubListItem>
                So-Yeop Yoo, Ok-Ran Jeong, " Socal Category based Recommendation
                Method,"Journal of Internet Computing and Services", Vol. 15,
                No. 5, pp.73-82, Oct. 2014.
              </PubListItem>
              <PubListItem>
                Ok-Ran Jeong, " Social Network based Podcast Search System,"
                Journal of Internet Computing and Services", Vol. 14, No.2,
                pp.35-43, April, 2013.
              </PubListItem>
              <PubListItem>
                Jeongmin Park, Ok-Ran Jeong,&nbsp; "An Approach to Generation
                Monitoring Module using UML Model", The Journal of Society for
                Computer and Information, Vol.16, No.9,&nbsp;pp. 57-68,
                September, 2011.
              </PubListItem>
              <PubListItem>
                Ok-Ran Jeong,&nbsp;Jehwan Oh, Eunseok Lee, "A Framework for
                Q&amp;A Community based Vertical Search", The Journal of Society
                for e-Business Studies, Vol.16, No.2,&nbsp;pp. 143-157, May,
                2011.
              </PubListItem>
              <PubListItem>
                Ok-Ran Jeong,&nbsp;Dong-Sub Cho, "A Three-step Preprocessing
                Algorithm for Enhanced Classification of
                E-Mail&nbsp;Recommendation System", The KIEE (Korea Institute of
                Electrical Engineers) Transactions: Part D, Vol.54, No.4, pp.
                251-258, April 2005.
              </PubListItem>
              <PubListItem>
                Ok-Ran Jeong,&nbsp;Dong-Sub Cho, " Design and Implementation of
                Web Mail Filtering Agent for Personalized&nbsp;Classification",
                The KIPS (Korea Information Processing Society) Transactions:
                Part B, VOL. 10-B, No 7,&nbsp;December 2003.
              </PubListItem>
              <PubListItem>
                So-Young Lee,&nbsp;Ok-Ran Jeong,&nbsp;Dong-Sub Cho, "Framework
                Design for Managing the Distributable Official&nbsp;XML
                Documents", The Journal of Korean Association of Computer
                Education, VOL. 7, NO. 2, March 2004.
              </PubListItem>
              <PubListItem>
                Eun-Young Kim,&nbsp;Ok-Ran Jeong,&nbsp;Dong-Sub Cho, "Design and
                Implementation of e-Commerce User&nbsp;Authentication Interface
                using the Mouse Gesture", The Journal of Korea Multimedia
                Society, VOL.5, NO.5,&nbsp;June 2003 .
              </PubListItem>
              <PubListItem>
                Ji-Yeun Shin,&nbsp;Ok-Ran Jeong,&nbsp;Dong-Sub Cho , "The
                Analysis of Individual Learning Status on
                Web-Based&nbsp;Instruction", The Journal of Korean Association
                of Computer Education, VOL. 6, NO. 2, April 2003.
              </PubListItem>
              <PubListItem>
                Mi-Jung Kang,&nbsp;Ok-Ran Jeong,&nbsp;Dong-Sub Cho, "Design and
                Implementation of Web Server for Analyzing&nbsp;Clickstream",
                The Korea Information Processing Society Transactions: Part D,
                VOL. 9-D, No 5, October 2002.
              </PubListItem>
            </PubList>
          </details>
        </div>
        <hr />
        <div id="kor_conf">
          <ListTitle>Korean Conferences</ListTitle>
          <PubList>
            <PubListItem>
              TaeHeon Seong, SoonYong Kim, DaeHo Kim and OkRan Jeong, "A Study on the Construction of a 
              Korean Language-Oriented Knowledge Graph in the Mental Health Domain", KCC 2025.
            </PubListItem>
            <PubListItem>
              HaeBin Han, SeonGyoung Lee, SoYeop Yoo and OkRan Jeong, "A Depression Detection System
              Using Emotion Intensity Lexicon and Medical Text Summarization", KCC 2025.
            </PubListItem>
            <PubListItem>
              YongWan Joo, DongHyun Lim, DongHyeon Kim, SeungYeon Sun and OkRan Jeong, 
              "Empathetic Dialogue Generation Model Using Reinforcement Learning with 
              AI-Based Feedback", KCC 2025.
            </PubListItem>
            <PubListItem>
              TaeHeon Seong, DaeHo Kim, SeYoung Kim and OkRan Jeong, "A Study on 
              a Question-Answering System for Supporting Nurse Decision-Making 
              based on Generative AI and Medical Knowledge Graph", KSC 2024.
            </PubListItem>
            <PubListItem>
              HyoJin Ko, MinJi Kim, HaYoung Lee, and Ok-Ran Jeong, "No-code AI
              based personalized healthcare framework", The 25th Korean Database
              Conference, 2023.
            </PubListItem>
            <PubListItem>
              SeYoung Kim, DaeHo Kim, and Ok-Ran Jeong, "A study on a Deep
              Learning based Nursing Surveillance Decision-making System using
              EMR data", The 25th Korean Database Conference, 2023.
            </PubListItem>
            <PubListItem>
              SoYeop, Yoo., and OkRan, Jeong., “Auto-growing Knowledge Graph
              based Intelligent Chatbot,” 2019 Spring Conference of KISM &amp;
              SEBS, 2019.
            </PubListItem>
            <PubListItem>
              DaeHo, Kim., JiHye, Kim., and OkRan, Jeong., “A Study on the
              Intelligent Traffic Signal Management System,” 2019 Spring
              Conference of KISM &amp; SEBS, 2019.
            </PubListItem>
            <PubListItem>
              SungMin, Yang., SoYeop, Yoo., YeonSun, Ahn., and OkRan, Jeong.,
              “BERT based Knowledge Graph for Person-Relation Extraction,” 2019
              Spring Conference of KISM &amp; SEBS, 2019.
            </PubListItem>
            <PubListItem>
              JiMin, Seok., JiHyeon, Yoon., and OkRan, Jeong., “Emotion Analysis
              System based on Social Media Data,” 2018 KCC, 2018.
            </PubListItem>
            <PubListItem>
              HyungDong, Kang., HyoungWook, Lee., HeeSu, Lee., SoYeop, Yoo., and
              OkRan, Jeong., “A Study on the Context Awareness based Traffic
              Flow Prediction Model using Deep Learning,” 2018 KCC, 2018.
            </PubListItem>
            <PubListItem>
              SungMin, Yang., SoYeop, Yoo., DaeHo, Kim., and OkRan, Jeong., “A
              Study for Real-Time Disease Detection using Social Media
              Contents,” 2018 Fall Conference, Korean Society for Internet
              Information, 2018.
            </PubListItem>
            <PubListItem>
              HyunJoong, Kim., DaeHo, Kim., and OkRan, Jeong., “A Korean
              Relation Analysis System using ConceptNet,” Korean Institute of
              Information Scientists and Engineers (KIISE), 2017 Korea Computer
              Congress Conference, 2017.
            </PubListItem>
            <PubListItem>
              HwanKyoo, Yeo., JeIn, Song., and OkRan, Jeong., “Personalized News
              Recommendations Using Temporal Database,” Korean Institute of
              Information Scientists and Engineers (KIISE), 2017 Korea Computer
              Congress Conference, 2017.
            </PubListItem>
            <PubListItem>
              YoungYol, Na., JeIn, Song., and OkRan, Jeong., “A News
              Recommendation System based on Vector Space Model,” Korean
              Institute of Information Scientists and Engineers (KIISE), 2017
              Korea Computer Congress Conference, 2017.
            </PubListItem>
            <PubListItem>
              DaeHo, Kim., HyunJoong, Kim., JungWook, Kim., HyunWoo, Yoo.,
              SoYeop, Yoo., and OkRan, Jeong., “Social Network based
              Personalized Travel Scheduling System,” Korean Institute of
              Information Scientists and Engineers (KIISE), 2016 Korea Computer
              Congress Conference, 2016.
            </PubListItem>
            <PubListItem>
              YoungYol, Na., HwanKyoo, Yeo., SangWok, Yoo., JeIn, Song., and
              OkRan, Jeong., “Social Network based A News Recommendation
              System,” Korean Institute of Information Scientists and Engineers
              (KIISE), 2016 Korea Computer Congress Conference, 2016.
            </PubListItem>
            <PubListItem>
              JeIn, Song., SoYeop, Yoo., and OkRan, Jeong., “AsterixDB based
              Keyword Trajectory Analysis System”, Korean Institute of
              Information Scientists and Engineers (KIISE), 2016 Korea Computer
              Congress Conference, 2016.
            </PubListItem>
            <PubListItem>
              JaeSang, Lim., TaeSoo, Park., and OkRan, Jeong., “AsterixDB based
              Social Media Analysis System,” Korean Institute of Information
              Scientists and Engineers (KIISE), 2016 Korea Computer Congress
              Conference, 2016.
            </PubListItem>
            <PubListItem>
              JeongHo, Park., SoYeop, Yoo., and OkRan, Jeong., “Social
              Context-aware based Travel Recommendation System”, Korean
              Institute of Information Scientists and Engineers (KIISE), 2016
              Korea Computer Congress Conference, 2016.
            </PubListItem>
            <PubListItem>
              Jein Song,&nbsp;So-Yeop Yoo, Taesoo Park&nbsp;and&nbsp;Ok-Ran
              Jeong ,"Social Network based Collaborative Project Recommendation
              System.” Korean Institute of Information Scientists and Engineers
              (KIISE), 2015 Korea Computer Congress Conference, 2015. (in
              Korean)
            </PubListItem>
            <PubListItem>
              &nbsp;So-Yeop Yoo, Taesoo Park&nbsp;and&nbsp;Ok-Ran Jeong&nbsp;, “
              A Framework for Analyzing Social Media Contents.” Korean Institute
              of Information Scientists and Engineers (KIISE), 2015 Korea
              Computer Congress Conference, 2015. (in Korean)
            </PubListItem>
            <PubListItem>
              So-Yeop Yoo, JaeSang Lim and&nbsp;Ok-Ran Jeong, “ A Personalized
              Social Search System” Korean Institute of Information Scientists
              and Engineers (KIISE), 2015 Korea Computer Congress Conference,
              2015. (in Korean)
            </PubListItem>
          </PubList>
          <details>
            <summary>More Korean conferences before 2015</summary>
            <PubList>
              <PubListItem>
                Yoo, So-Yeop, and Jeong, Ok-Ran. “Social Category based YouTube
                Recommendation System.” Korean Institute of Information
                Scientists and Engineers (KIISE), 2014 Korea Computer Congress
                Conference, 2014. (in Korean)
              </PubListItem>
              <PubListItem>
                Park, Tae-Soo, Yoo, So-Yeop, and Jeong, Ok-Ran. “Social Network
                based Music Recommendation System.” Korean Institute of
                Information Scientists and Engineers (KIISE), 2014 Korea
                Computer Congress Conference, 2014. (in Korean)
              </PubListItem>
              <PubListItem>
                Yoo, So-Yeop, Park, Tae-Soo, and Jeong, Ok-Ran. “A Framework for
                Analyzing Social Media Contents.” Korean Institute of
                Information Scientists and Engineers (KIISE), 2015 Korea
                Computer Congress Conference, 2015. (in Korean)
              </PubListItem>
              <PubListItem>
                Seunseok Kang, Dongjoo Lee,&nbsp;Ok-Ran Jeong, Sang-goo Lee,
                "Automated-Database Tuning System with Knowledge-based Reasoning
                Engine", KCC 2007, Vol.34, No.1 (A), June, 2007.
              </PubListItem>
              <PubListItem>
                Ok-Ran Jeong, Dong-Sub Cho, "Preprocessing Algorithm for
                Categorizing E-Mail Document", Proceedings of the 11
                <sup>th</sup>&nbsp;KMMS(Korea Multimedia Society) Spring
                Conference, Vol.7, No.2, pp.9-12, November 2004.
              </PubListItem>
              <PubListItem>
                Ok-Ran Jeong, Dong-Sub Cho, "Preprocessing Algorithm for
                Categorizing E-Mail Document", Proceedings of the 11
                <sup>th</sup>&nbsp;KMMS(Korea Multimedia Society) Spring
                Conference, Vol.7, No.2, pp.9-12, November 2004.
              </PubListItem>
              <PubListItem>
                Ok-Ran Jeong, Dong-Sub Cho, "A Rule Filtering Component based
                E-Mail Recommendation Agent System", Proceeding of KIEE Summer
                Annual Conference 2004, Vol.D, pp.2592-2594, July, 2004.[Best
                Paper Award]
              </PubListItem>
              <PubListItem>
                Ok-Ran Jeong, Dong-Sub Cho, "A Dynamic Recommendation Agent
                System for E-Mail Management based on Rule Filtering Component",
                Proceeding of the Information and Control Symposium 2004(ICS'
                04), p. 126-128, May 2004.
              </PubListItem>
              <PubListItem>
                Young-Soon Hyun,&nbsp;Ok-Ran Jeong, Dong-Sub Cho, "&nbsp;An
                E-mail System containing SCORM –based Meta-data Generator",
                Proceedings of the 21<sup>st</sup>&nbsp;KIPS Spring Conference,
                Vol.11, No 1,&nbsp;pp.637-640, May 2004.
              </PubListItem>
              <PubListItem>
                Ok-Ran Jeong, Dong-Sub Cho, "An E-Mail Recommendation System
                using Semi-Automatic Method", 2003 Conference on Information and
                Control Systems, pp.604-607, November, 2003.
              </PubListItem>
              <PubListItem>
                Young-Soon Hyun,&nbsp;Ok-Ran Jeong, Dong-Sub Cho, "Agent for
                File Format based Classification of the Attached File in E-Mail
                System", Proceedings of the 20<sup>th</sup>&nbsp;KIPS Fall
                Conference, Vol. 10, No.2, pp.801-804,November 2003.
              </PubListItem>
              <PubListItem>
                Ok-Ran Jeong, Dong-Sub, "A Recommendation Agent System for
                E-Mail Classification", Proceedings of The 30<sup>th</sup>
                &nbsp;KISS Fall Conference, Vol. 30, No. 2, pp.94-96, October
                2003.
              </PubListItem>
              <PubListItem>
                Young-Soon Hyun,&nbsp;Ok-Ran Jeong, Dong-Sub Cho, "Agent for
                File Format based Classification of the Attached File in E-Mail
                System", Proceeding of the KIEE Summer Annual Conference 2003,
                Vol. D., pp.2645-2647,&nbsp;&nbsp;July 2003.
              </PubListItem>
              <PubListItem>
                Ok-Ran Jeong, Dong-Sub Cho, "An Agent for Web Mail
                Personalization", Proceeding of the KIEE Summer Annual
                Conference 2003, Vol. D, pp. 2531-2533, July 2003.
              </PubListItem>
              <PubListItem>
                Ok-Ran Jeong, Dong-Sub Cho, "A Multimedia Mail Delivery System
                using Predefined Mail Template", Proceedings of the 11
                <sup>th</sup>&nbsp;KMMS Spring Conference, Vol.6, No.1,
                pp.563-566, May 2003.
              </PubListItem>
              <PubListItem>
                Young-Soon Hyun,&nbsp;Ok-Ran Jeong, Dong-Sub Cho,
                "Classification of the Multimedia Attached File in E-mail
                System", Proceedings of the 11<sup>th</sup>&nbsp;KMMS Spring
                Conference, Vol.6, No.1, pp.746-749, May 2003.
              </PubListItem>
              <PubListItem>
                Ok-Ran Jeong, Dong-Sub Cho, "Personalized Mail Filtering Agent",
                Preceedings of the 19<sup>th</sup>&nbsp;KIPS Spring Conference,
                Vol. 10, No.1., pp.729-732, May 2003.
              </PubListItem>
              <PubListItem>
                Young-Soon Hyun,&nbsp;Ok-Ran Jeong, Dong-Sub Cho, "Agent for
                Classifying the Attached File in E-Mail System", Preceedings of
                the 19<sup>th</sup>&nbsp;KIPS Spring Conference, Vol. 10, No.1.,
                pp.1067-1070, May 2003.
              </PubListItem>
              <PubListItem>
                Ok-Ran Jeong, Dong-Sub Cho, "Design of Filtering Agent Interface
                using XML E-Mail System",&nbsp;Proceeding of the Information and
                Control Symposium 2004 (The Institute of Electronics Engineers
                of Korea, The Korean Institute of Electrical Engineers), Vol.25,
                No. 2, pp.476-480, November 2002.
              </PubListItem>
              <PubListItem>
                Ok-Ran Jeong, Dong-Sub Cho&nbsp;"Design of an Mail Delivery
                System based on Mail Template", Proceedings of the 29
                <sup>th</sup>&nbsp;KISS Fall Conference, Vol. 29, No.2,
                pp.454-456, October 2002.
              </PubListItem>
              <PubListItem>
                Mi-Ran Lee,&nbsp;Ok-Ran Jeong, Dong-Sub Cho,&nbsp;"Design of
                Game Log Mining System for Analyzing the Gamer's Behavior",
                Proceedings ofthe Korea Game Society Summer Conference 2002,
                pp.223-225, July 2002.
              </PubListItem>
              <PubListItem>
                Yeun-Jung Kim,&nbsp;Ok-Ran Jeong, Dong-Sub Cho, "Design and
                Implement of the Multi-threaded Game Server using Telnet",
                Proceedings of the KIEE Summer Annual Conference 2002, Vol. D,
                pp.2806-2808, July 2002.
              </PubListItem>
              <PubListItem>
                Yeun-Jung Kim, Ok-Ran Jeong, Dong-Sub Cho, "Design and
                Implementation of the Quiz Game Server", Proceedings of the KMMS
                Spring Conference 2002, Vol.5, No.1, pp.469-473, May 2002.
              </PubListItem>
              <PubListItem>
                Ok-Ran Jeong, Dong-Sub Cho, "An algorithm for optimal reduction
                of HTTP Message Traffic", Proceedings of the 28<sup>th</sup>
                &nbsp;KISS Spring Conference, pp. 1418-1420, April 2001.
              </PubListItem>
              <PubListItem>
                Ji-Hye Ok, Mi-Jung Kang, Ok-Ran Jeong, Dong-Sub Cho, "Game
                Software Testing using Automatic Event Tracking", Proceedings of
                the Korea Game Society Winter Conference 2002, pp.364-366,
                January 2002.
              </PubListItem>
            </PubList>
          </details>
        </div>
      </ListContainer>
    </PubContainer>
  );
};

export default Publications;

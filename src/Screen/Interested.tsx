import React from "react"
import styled from "styled-components"

const Container = styled.section`
 overflow: auto;
`

const Interested = () => {

    return (
        <Container>
            <h1>My Stack</h1>
            <h2>언어</h2>
            <ul>
            <li>HTML & CSS</li>
            <li>Javascript</li>
            <li>TypeScript</li>
            <li>Python</li>
            </ul>
            <h2>프로토콜</h2>
            <ul>
            <li>WebRTC</li>
            <li>WebSocket</li>
            <li>HTTP</li>
            </ul>
            <h2>데이터베이스/ORM</h2>
            <ul>
            <li>MongoDB</li>
            <li>MySQL</li>
            <li>PostgresQL</li>
            <li>TypeORM</li>
            <li>Sequelize</li>
            </ul>
            <h2>서버/프레임워크</h2>
            <ul>
            <li>NodeJS</li>
            <li>Express.js</li>
            <li>Nest.js</li>
            <li>Flask</li>
            </ul>
            <h2>웹프레임워크/라이브러리</h2>
            <ul>
            <li>React (hooks)</li>
            <li>Webpack</li>
            <li>Babel</li>
            <li>Tailwind css</li>
            <li>GraphQL</li>
            <li>Three.js</li>
            </ul>
            <h2>컴퓨터비전</h2>
            <li>OpenCV-Python</li>

            <h2>테스팅</h2>
            <ul>
            <li>Jest</li>
            <li>React Testing Library</li>
            <li>Cypress</li>
            </ul>



            <h1>Now I'm interested in...</h1>
            <ul>
            <li>OpenCV</li>
            <li>Git & Github</li>
            <li>AWS</li>
            <li>Webpack</li>
            <li>Redux</li>
            <li>Kotlin</li>
            <li>C</li>
            <li>Blockchain</li>
            </ul>


        </Container>
    )
}

export default Interested
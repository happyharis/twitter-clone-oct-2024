import { Button, Col, Image, Nav, Row, Spinner } from "react-bootstrap";
import ProfilePostCard from "./ProfilePostCard";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostsByUser } from "../features/posts/postsSlice";

export default function ProfileMidBody() {
  const url = "https://pbs.twimg.com/profile_banners/83072625/1602845571/1500x500";
  const pic = "https://pbs.twimg.com/profile_images/1587405892437221376/h167Jlb2_400x400.jpg";

  const dispatch = useDispatch()
  const posts = useSelector(store => store.posts.posts)
  const loading = useSelector(store => store.posts.loading)

  useEffect(() => {
    const token = localStorage.getItem('authToken')
    // const token = '3lk21jj213lkj123lkjlkj21.2l1k3jl1k2j3kl12j3.1k2l3j1l2k3
    if (token) { // if token exist
      const decodedToken = jwtDecode(token)
      // const decodedToken = {id: 6, username: 'haris@haris.com'}
      const userId = decodedToken.id
      // const username = decodedToken.username
      // const userId = 6
      console.log(userId)
      dispatch(fetchPostsByUser(userId))
      // dispatch(fetchPostsByUser(6))
    }
  }, [dispatch])

  return (
    <Col sm={6} className="bg-light" style={{ border: "1px solid lightgrey" }}>
      <Image src={url} fluid />
      <br />
      <Image
        src={pic}
        roundedCircle
        style={{
          width: 150,
          position: "absolute",
          top: "140px",
          border: "4px solid #F8F9FA",
          marginLeft: 15,
        }}
      />

      <Row className="justify-content-end">
        <Col xs="auto">
          <Button className="rounded-pill mt-2" variant="outline-secondary">
            Edit Profile
          </Button>
        </Col>
      </Row>

      <p className="mt-5" style={{ margin: 0, fontWeight: "bold", fontSize: "15px" }}>
        Haris
      </p>

      <p style={{ marginBottom: "2px" }}>@haris.samingan</p>

      <p>I help people switch careers to be a software developer at sigmaschool.co</p>

      <p>Entrepreneur</p>

      <p>
        <strong>271</strong> Following <strong>610</strong> Followers
      </p>

      <Nav variant="underline" defaultActiveKey="/home" justify>
        <Nav.Item>
          <Nav.Link eventKey="/home">Tweets</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-1">Replies</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-2">Highlights</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-3">Media</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-4">Likes</Nav.Link>
        </Nav.Item>
      </Nav>

      {loading && (
        <Spinner animation="border" className="ms-3 mt-3" variant="primary" />
      )}

      {/* posts = [{id: 4, content: 'sigma school is amazing'}] */}
      {posts.map(post => (
        // post = {id: 4, content: 'sigma school is amazing'}
        <ProfilePostCard key={post.id} content={post.content} />
        // <ProfilePostCard key={4} content={'sigma school is amazing'} />
      ))}
    </Col>
  )
}
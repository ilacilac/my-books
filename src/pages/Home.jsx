import React from 'react';
import withAuth from '../hocs/withAuth';
import axios from 'axios';
import { message, Form, Input, Button, Row, Col } from 'antd';
import { MdCreate, MdDelete, MdLink, MdHourglassEmpty } from 'react-icons/md';
import bookStyles from '../books.module.scss';
import classNames from 'classnames/bind';
// import PersonContext from '../context/PersonContext';
// import Counter from '../components/Counter';
const cx = classNames.bind(bookStyles);
class Home extends React.Component {
  // static contextType = PersonContext;
  state = {
    books: [],
    loading: false,
    error: null,
    target: {},
  };
  render() {
    return (
      <div className={cx('book-wrap')}>
        <Row>
          <Col span={24}>
            <header>
              <h1>MY BOOKS</h1>
              {this.state.loading && (
                <div className={cx('loading')}>
                  <span className={cx('loading-icon')}>
                    <MdHourglassEmpty />
                  </span>
                  <p>책 정보를 불러오는 중입니다...</p>
                </div>
              )}
              {this.state.error && <h3>에러다</h3>}
            </header>
          </Col>
        </Row>
        {/* active layout */}
        <Row>
          <Col span={18} className={cx('h100', 'active-layout')}>
            {this.state.books.length && !this.state.loading ? (
              <Row>
                <Col span={12} className={cx('image-wrap')}>
                  <div className={cx('book-bg')}>
                    <img src="./images/book.png" alt="book" />
                    <div className={cx('book-text-wrap')}>
                      <p className={cx('book-title')}>
                        {this.state.target.title}
                      </p>
                      <p className={cx('book-author')}>
                        {this.state.target.author}
                      </p>
                    </div>
                  </div>
                </Col>
                <Col span={12}>
                  <div className={cx('active-book')}>
                    <p className={cx('title')}>{this.state.target.title}</p>
                    <p className={cx('author')}>
                      by <b>{this.state.target.author}</b>
                    </p>
                    <div className={cx('contents')}>
                      <p className={cx('message')}>
                        {this.state.target.message}
                      </p>
                      <p className={cx('url')}>{this.state.target.url}</p>
                    </div>
                    <p className={cx('date')}>{this.state.target.createdAt}</p>
                    <div className={cx('icon-wrap')}>
                      <button className={cx('icon-url')}>
                        <MdLink />
                      </button>
                      <button className={cx('icon-write')}>
                        <MdCreate />
                      </button>
                      <button className={cx('icon-delete')}>
                        <MdDelete />
                      </button>
                    </div>
                  </div>
                </Col>
              </Row>
            ) : (
              !this.state.loading && <div>No data</div>
            )}
          </Col>
          {/* 책장 list */}
          <Col span={6} className={cx('h100', 'books-list')}>
            <div className={cx('books-list-inner')}>
              <h2>목록</h2>
              {this.state.error === null &&
                this.state.books.map((book) => (
                  <>
                    <div className={`book ${book.bookId}`}>
                      <p
                        className="title"
                        onClick={() => {
                          this.setState({
                            loading: false,
                            error: null,
                            target: book,
                          });
                        }}
                      >
                        {book.title}
                      </p>
                      {/* <div className="contents">
                      <p className="message">{book.message}</p>
                      <p className="url">{book.url}</p>
                    </div>
                    <p className="date">{book.createdAt}</p> */}
                    </div>
                  </>
                ))}
            </div>
          </Col>
        </Row>
        {/* <PersonContext.Consumer>
          {(value) => <p>{JSON.stringify(value)}</p>}
        </PersonContext.Consumer> */}
        {/* <Counter /> */}
      </div>
    );
  }
  async componentDidMount() {
    console.log('Home componenDidMount');
    // // API를 요청해서 책 리스트를 가져온다.

    // url => 'https://api.marktube.tv/v1/books'
    // token
    // localStorage.getItem('token') => this.props.token

    // 로딩 시작
    this.setState({
      loading: true,
      error: null,
    });
    try {
      await sleep(3000);
      const response = await axios.get('https://api.marktube.tv/v1/book', {
        headers: {
          Authorization: `Bearer ${this.props.token}`,
        },
      });
      console.log(response.data);
      const books = response.data;
      this.setState({
        books,
        loading: false,
        error: null,
        target: books[0] || {},
      });
      console.log(this.state);
    } catch (error) {
      // 로딩끝
      this.setState({
        loading: false,
        error,
      });
      console.log(this.state);
      console.log(error);
    }
  }
}
export default withAuth(Home);

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

import React from "react"
import addToMailchimp from 'gatsby-plugin-mailchimp'
import styles from './email-signup.module.css'

export default class EmailSignup extends React.Component {
  // Note that you need to send an email & optionally, listFields
  state = {
    email: "",
    firstName: "",
    lastName: "",
    status: "Sign up to The Burndown today!",
  }

  handleInputChange = event => {
    const target = event.target
    const value = target.value
    const name = target.name

    this.setState({
      [name]: value,
    })
  }

  _handleSubmit = e => {
    e.preventDefault();
    console.log(this.state.email)
    addToMailchimp(this.state.email, { FNAME: this.state.firstName, LNAME: this.state.lastName }) // listFields are optional if you are only capturing the email address.
      .then(data => {
        this.setState({ status: data.msg })
      })
      .catch(() => {
        // unnecessary because Mailchimp only ever
        // returns a 200 status code
      })
  }

  render() {
    return (
      <div>
        <div className={styles.message} dangerouslySetInnerHTML={{ __html: this.state.status }} />
        <div>
          <form onSubmit={this._handleSubmit}>
            <div className={styles.row}>
              <div className={styles.col}>
                <label>First name<input
                  className={styles.input}
                  placeholder="First name"
                  type="text"
                  name="firstName"
                  value={this.state.firstName}
                  onChange={this.handleInputChange}
                /></label>
              </div>
              <div className={styles.col}>
                <label>Last name<input
                  className={styles.input}
                  placeholder="Last name"
                  type="text"
                  name="lastName"
                  value={this.state.lastName}
                  onChange={this.handleInputChange}
                /></label>
              </div>
            </div>
            <div className={styles.row}>
              <label>Email<input
                className={styles.input}
                style={{
                  marginBottom: `5px`,
                  width: `100%`
                }}
                placeholder="Last name"
                type="text"
                name="email"
                value={this.state.email}
                onChange={this.handleInputChange}
              /></label>
            </div>
            <button className={styles.button} type="submit">Submit</button>
          </form>
        </div>
      </div >
    )
  }
}
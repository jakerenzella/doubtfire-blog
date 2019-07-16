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
        this.setState({status: data.msg})
      })
      .catch(() => {
        // unnecessary because Mailchimp only ever
        // returns a 200 status code
      })
  }

  render() {
    return (
      <div>
        <div dangerouslySetInnerHTML={{__html: this.state.status}} />
        <form onSubmit={this._handleSubmit}>
          <input
            className={styles.halfinput}
            style={{ float: `left` }}
            placeholder="First name"
            type="text"
            name="firstName"
            value={this.state.firstName}
            onChange={this.handleInputChange}
          />

          <input
            className={styles.halfinput}
            style={{ float: `right` }}
            placeholder="Last name"
            type="text"
            name="lastName"
            value={this.state.lastName}
            onChange={this.handleInputChange}
          />

          <input
            className={styles.input}
            style={{
              marginTop: `5px`,
              marginBottom: `5px`
            }}
            placeholder="Last name"
            type="text"
            name="email"
            value={this.state.email}
            onChange={this.handleInputChange}
          />
          <button className={styles.button} type="submit">Submit</button>
        </form>
      </div>
    )
  }
}
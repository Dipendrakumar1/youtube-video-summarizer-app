import React, { Component } from 'react';
import Tabs from './Tabs';
import ET from '../transcripts/English.txt';
import HT from '../transcripts/Hindi.txt';

class BackendAPI extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			error: null,
			isLoaded: false,
			isLoading: false,
			failedMessage: null,
			message: '',
			englishTranscript: '',
			hindiTranscript: '',
			originalTextLength: 0,
			summarizedTextLength: 0,
		};
	}

	handleChange = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	}

	handleSubmit = (event) => {
		event.preventDefault();

		this.setState({
			isLoading: true,
			isLoaded: false,
		});

		const FinalURL = `http://127.0.0.1:5000/api/?video_url=${encodeURIComponent(this.state.name)}`;

		fetch(FinalURL)
			.then((res) => res.json())
			.then(
				(result) => {
					if (result.data.message === "Success") {
						this.setState({
							isLoaded: true,
							isLoading: false,
							message: result.data.message,
							englishTranscript: result.data.eng_summary,
							hindiTranscript: result.data.hind_summary,
							originalTextLength: result.data.original_txt_length,
							summarizedTextLength: result.data.final_summ_length,
						});
					} else {
						this.setState({
							isLoaded: true,
							isLoading: false,
							failedMessage: result.data.error
						});
					}
				},

				(error) => {
					alert('An Error occured: ' + this.state);
					this.setState({
						isLoaded: true,
						isLoading: false,
						error: error
					});
				}
			)

		event.preventDefault();
	}

	stopAudio = () => {
		window.speechSynthesis.cancel();
	}

	textToAudio = () => {
		const synth = window.speechSynthesis;
		const utterance = new SpeechSynthesisUtterance(this.state.englishTranscript);
		synth.speak(utterance);
	}

	render() {
		const {
			isLoaded,
			isLoading,
			message,
			englishTranscript,
			hindiTranscript,
			originalTextLength,
			summarizedTextLength,
			failedMessage,
		} = this.state;

		if (isLoading) {
			return (
				<>
					<form onSubmit={this.handleSubmit}>
						<label>
							Video URL:
							<input
								className="input-1"
								type="url"
								value={this.state.name}
								placeholder="Paste your YouTube Video link here"
								name="name"
								onChange={this.handleChange}
								required
								autoComplete="off"
							/>
						</label>
						<input className="submit-1" type="submit" value="Summarize" />
					</form>
					<center>
						<div className="lds-ripple">
							<div></div>
							<div></div>
						</div>
					</center>
					<Tabs>
						<div label="English">
							<div className="tab-content-1">
								English Summarized Text Will be Shown Here...
							</div>
						</div>
						<div label="Hindi">
							<div className="tab-content-1">
								Hindi Summarized Text Will be Shown Here...
							</div>
						</div>
			
					</Tabs>
				</>
			);
		} else if (isLoaded) {
			return (
				<>
					<form onSubmit={this.handleSubmit}>
						<label>
							Video URL:
							<input
								className="input-1"
								type="url"
								value={this.state.name}
								placeholder="Paste your YouTube Video link here."
								name="name"
								onChange={this.handleChange}
								required
								autoComplete="off"
							/>
						</label>
						<input className="submit-1" type="submit" value="Summarize" />
					</form>
					{message === "Success" ? (
						<>
							<p>{originalTextLength}<i className="arrow right"></i>{summarizedTextLength}</p>
							<Tabs>
								<div label="English">
									<div className="tab-content">
										<div>
											<center>
												<button
													className="btn-1"
													type="button"
													onClick={this.textToAudio}
												>
													Speak
												</button>
												<button
													className="btn-1"
													type="button"
													onClick={this.stopAudio}
												>
													Stop
												</button>
											</center>
											<center>
												<a
													href={ET}
													className="buttonDownload"
													download="English_Transcript.txt"
													type="button"
												>
													Download
												</a>
											</center>
										</div>
										{englishTranscript}
									</div>
								</div>
								<div label="Hindi">
									<div className="tab-content">
										<div>
											<center>
												<a
													href={HT}
													className="buttonDownload"
													download="Hindi_Transcript.txt"
													type="button"
												>
													Download
												</a>
											</center>
										</div>
										{hindiTranscript}
									</div>
								</div>
							</Tabs>
						</>
					) : (
						<>
							<div>
								<br />
								An Error occurred: {failedMessage}
							</div>
							<Tabs>
								<div label="English">
									<div className="tab-content-1">
										English Summarized Text Will be Shown Here...
									</div>
								</div>
								<div label="Hindi">
									<div className="tab-content-1">
										Hindi Summarized Text Will be Shown Here...
									</div>
								</div>
							</Tabs>
						</>
					)}
				</>
			);
		} else {
			return (
				<>
					<form onSubmit={this.handleSubmit}>
						<label>
							Video URL:
							<input
								className="input-1"
								type="url"
								value={this.state.name}
								placeholder="Paste your YouTube Video link here."
								name="name"
								onChange={this.handleChange}
								required
								autoComplete="off"
							/>
						</label>
						<input className="submit-1" type="submit" value="Summarize" />
					</form>
					<p>
						Original Length<i className="arrow right"></i>Final Length
					</p>
					<Tabs>
						<div label="English">
							<div className="tab-content-1">
								English Summarized Text Will be Shown Here...
							</div>
						</div>
						<div label="Hindi">
							<div className="tab-content-1">
								Hindi Summarized Text Will be Shown Here...
							</div>
						</div>
					</Tabs>
				</>
			);
		}
	}
}

export default BackendAPI;


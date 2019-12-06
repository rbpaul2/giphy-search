import React from "react";
import { render } from "react-dom";
import {observer} from "mobx-react";
import _ from "lodash";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const autofills = [
    'about',
    'above',
    'across',
    'app',
    'apple',
    'appreciate',
    'bad',
    'ball',
    'balloon',
    'bell',
    'cat',
];

@observer
class GiphySearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            isLoading: false,
            gifs: [],
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: _.get(event, 'target.value', '') });
    }

    handleSubmit(event) {
        const searchString = encodeURI(this.state.value);
        const url = `http://api.giphy.com/v1/gifs/search?q=${searchString}&api_key=DLCVuTK6KZExOS7JoMq82bi5MaI6EbWO&limit=1`;
        fetch(url)
            .then(data => data.json())
            .then(res => {
                console.log(res);
                this.setState({ gifs: _.get(res, 'data') });
            })
            .catch(err => console.log(err));
        event.preventDefault();

    }

    render() {
        return (
            <div className={'container'}>
                <form onSubmit={this.handleSubmit}>
                    <div className={'content'}>
                        <div className={'header'}>
                            <Autocomplete
                                freeSolo
                                options={autofills}
                                inputValue={this.state.value}
                                onInputChange={this.handleChange}
                                renderInput={params => (
                                    <TextField {...params} label="Search for GIF" margin="normal" variant="outlined" fullWidth />
                                )}
                            />
                            <input type="submit" value="GO" />
                        </div>
                        <div className={'results'}>
                            {this.state.gifs.map(g => {
                                return <img src={_.get(g, 'images.original.url')} />;
                            })}
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

const theme = createMuiTheme({
    palette: {
        type: 'dark',
    },
});

render(
    <ThemeProvider theme={theme}>
        <GiphySearch/>
    </ThemeProvider>,
  document.getElementById("root")
);

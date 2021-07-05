type State = {
    text: string;
  };
  class FormTodo extends React.Component<Props, State> {
    state = {
      text: "",
    };
  
    // typing on RIGHT hand side of =
    onChange = (e: React.FormEvent<HTMLInputElement>): void => {
      this.setState({ text: e.currentTarget.value });
    };
    render() {
      return (
        <div>
          <input type="text" value={this.state.text} onChange={this.onChange} />
        </div>
      );
    }
  }
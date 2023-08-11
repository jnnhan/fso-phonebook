const Filter = (props) => (
    <div>
      filter by name 
        <input
          value={props.filter}
          onChange={props.handleChange}
        />
    </div>
)

export default Filter
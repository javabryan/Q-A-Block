const Choice = (
	{
		name,
		id,
		index,
		onIsCorrectChecked
	},
) => {
	return (
		<div id={id} className="choice-container">
			<label htmlFor="choice-content">Choice
				<input name={`choice-content-${index}`} type="text" placeholder="Enter the choice content..."/>
			</label>
			<label htmlFor="choice-is-correct">Is correct?
				<input id={`${id}-is-correct`} name={`${name}-is-correct`} type="checkbox" value="correct" onClick={( e ) => onIsCorrectChecked( e, index )}/>
			</label>
		</div>
	);
};

export default Choice;

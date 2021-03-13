const QuestionItems = ( {
	questionId,
	questionName,
	renderedName,
	renderedContent,
	choiceItems,
	allowMultipleChoice
} ) => {
	return (

		<div className="question-item">
			{questionName}
			<div className="rendered-question-item-name">{renderedName}</div>
			<div className="question-content">{renderedContent}</div>
			<div className="rendered-choices">
				<form>
					{choiceItems.length > 0 &&
					choiceItems.map( ( item ) => (
						<div key={item.id}>
							<input
								className={`radio-${questionId}`}
								type={allowMultipleChoice ? 'checkbox' : 'radio'}
								id={item.id}
								name={item.name}
								value={item.content}
								checked={item.selected}
								onChange={() => {
									if (!allowMultipleChoice) {
										for ( let i = 0; i < choiceItems.length; i++ ) {
											choiceItems[ i ].selected = false;
										}
									}
									item.selected = !item.selected;
								}}
							/>
							<label htmlFor={item.name}>{item.content}</label>
						</div>
					) )}
				</form>
			</div>
		</div>
	)
};

export default QuestionItems;

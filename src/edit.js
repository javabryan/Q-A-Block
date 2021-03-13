import { __ }                         from '@wordpress/i18n';
import { useState, useEffect }        from '@wordpress/element';
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import INNER_BLOCKS_TEMPLATE          from './inner_blocks_template';
import Choice                         from './choice';
import QuestionItems                  from './QuestionItems';
import './editor.scss';

const edit = (
	{
		attributes,
		setAttributes,
		isSelected,
	},
) => {

	const [ isActive, setIsActive ] = useState( false );
	const [ allowMultipleChoice, setAllowMultipleChoice ] = useState( false );
	const [ choiceItems, setChoiceItems ] = useState( [] );
	const [ questionItems, setQuestionItems ] = useState( [] );

	const {} = attributes;

	const onAddChoiceItem = () => {
		setChoiceItems( items => [
			...items, {
				id        : createKey( 'choice' ),
				name      : `choice-${items.length}`,
				content   : '',
				isCorrect : false,
				selected  : false,
			},
		] );
	};

	const onChangeChoice = ( e, index, questionId ) => {
		e.preventDefault();
		const $radios = document.getElementsByClassName( `radio-${questionId}` );

		for ( let i = 0; i < $radios.length; i++ ) {
			if ( $radios[ i ] !== e.target ) {
				$radios[ i ].checked = false;
			}
		}
	};

	const onIsCorrectChecked = ( e, index ) => {
		if ( e.target.checked ) {
			choiceItems[ index ].isCorrect = true;
		}
	};

	const onRemoveChoiceItem = ( e ) => {
		const id = e.target.getAttribute( 'id' );
		setChoiceItems( choiceItems.filter( item => item.id !== id ) );
	};

	const moveArrayItem = ( array, from, to ) => {
		const newArr = array[ from ];
		if ( from < to ) {
			for ( let i = from; i < to; i++ ) {
				array[ i ] = array[ i + 1 ];
			}
		} else {
			for ( let p = from; p > to; p-- ) {
				array[ p ] = array[ p - 1 ];
			}
		}
		array[ to ] = newArr;
		return array;
	};

	const onMoveChoiceItemUp = ( index ) => {
		const target = index - 1;
		setChoiceItems( moveArrayItem( choiceItems, index, target ) );
	};

	const onMoveChoiceItemDown = ( index ) => {
		const target = index + 1;
		setChoiceItems( moveArrayItem( choiceItems, index, target ) );
	};

	const createQuestionItem = ( e ) => {
		e.preventDefault();
		const rendered_name = document.getElementById( 'question-name' ).value;
		const rendered_content = document.getElementById( 'question-content' ).value;

		for ( let i = 0; i < choiceItems.length; i++ ) {
			choiceItems[ i ].content = document.getElementsByName( `choice-content-${i}` )[ 0 ].value;
		}

		setQuestionItems( items => [
			...items, {
				questionId          : createKey( 'question' ),
				questionName        : `question-${items.length}`,
				renderedName        : rendered_name,
				renderedContent     : rendered_content,
				choiceItems         : choiceItems,
				allowMultipleChoice : allowMultipleChoice,
			},
		] );

		setChoiceItems( [] );
		setAllowMultipleChoice( false );
		setIsActive( false );
	};

	const createKey = type => `${type}-${Math.floor( Math.random() * 100 ) + Date.now()}`;

	return (
		<div {...useBlockProps()}>
			<InnerBlocks
				template={INNER_BLOCKS_TEMPLATE}
				templateLock="all"
			/>
			{
				questionItems.length > 0 &&
				<ul>
					{questionItems.map( ( item ) => (
						<li key={item.questionId}>
							<QuestionItems
								questionName={item.name}
								questionId={item.questionId}
								renderedName={item.renderedName}
								renderedContent={item.renderedContent}
								choiceItems={item.choiceItems}
								onChangeChoice={onChangeChoice}
								allowMultipleChoice={item.allowMultipleChoice}
							/>
						</li>
					) )};
				</ul>
			}
			{
				questionItems.length === 0 &&
				<span>Questions & Responses will be displayed here. Please create a new question.</span>
			}
			<div className="qa-editor">
				<div className="question-items-container">
					{isActive &&
					<div>
						<form onSubmit={( e ) => createQuestionItem( e )}>
							<label htmlFor="question-name">{__( 'Question name' )}
								<input
									name="question-name"
									id="question-name" type="text"
									placeholder={__( 'Enter a name...' )}/>
							</label>

							<label htmlFor="question-content">{__( 'Question content' )}
								<input
									name="question-content"
									id="question-content"
									type="text"
									placeholder={__( 'Enter the question content...' )}/>
							</label>

							<div className="question-choices-container">
								<span>{__( 'Choice Details' )}</span>
								<div className="question-choices">
									<input
										id="allow-multiple-choice"
										name="allow-multiple-choice"
										type="checkbox" value="allow"
										onChange={() => setAllowMultipleChoice( !allowMultipleChoice )}
										checked={allowMultipleChoice}
									/>
									<label htmlFor="allow-multiple-choice">Allow multiple choice?</label>
									{choiceItems.length > 0 &&
									choiceItems.map( ( item, index ) => (
										<li key={item.id}>
											<Choice id={item.id} name={item.name} index={index} onIsCorrectChecked={onIsCorrectChecked}/>
											<div className="choice-controls">
												<button id={item.id} type="button" onClick={( e ) => onRemoveChoiceItem( e )}>Remove</button>
												{index > 0 &&
												<button type="button" onClick={() => onMoveChoiceItemUp( index )}>Move Up</button>
												}
												{index !== choiceItems.length - 1 &&
												<button type="button" onClick={() => onMoveChoiceItemDown( index )}>Move Down</button>
												}
											</div>
										</li>
									) )
									}
								</div>
								<button type="button" onClick={() => onAddChoiceItem()}>Add Choice</button>
							</div>

							<input type="submit" value="Create"/>
						</form>
						<div className="controls">
							<button type="button" onClick={() => setIsActive( false )}>Cancel</button>
						</div>
					</div>
					}

				</div>
				{!isActive &&
				<button type="button" onClick={() => setIsActive( true )}>Add a new question</button>
				}
			</div>
		</div>
	);
};

export default edit;

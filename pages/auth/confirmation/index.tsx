/* eslint-disable react/no-unescaped-entities */
import MailWaiting from 'components/user/MailWaiting';
import React from 'react'
    ;
function Confirmation() {
    function onSubmit() {

    }
    return (
        <MailWaiting title={`We've just sent you an email confirmation.`} onSubmit={onSubmit} />
    );
}

export default Confirmation;
